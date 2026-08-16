export type LottieBrandRoles={primary:string;secondary:string;accent:string;ink:string;surface:string;line:string}

type JsonValue=null|boolean|number|string|JsonValue[]|{[key:string]:JsonValue}

const TOKENS:Record<keyof LottieBrandRoles,[number,number,number,number]>={
  primary:[0,0.55,0.85,1],
  accent:[0.54,0.18,0.33,1],
  secondary:[0.71,0.94,0.98,1],
  ink:[0.09,0.13,0.15,1],
  surface:[1,1,1,1],
  line:[0.77,0.82,0.84,1]
}

const round=(n:number)=>Math.round(n*1000)/1000
export function hexToLottieColor(hex:string):[number,number,number,number]{
  const clean=hex.replace('#','').trim()
  if(!/^[0-9a-f]{6}$/i.test(clean))throw new Error(`Expected six-digit hex color, got ${hex}`)
  return [round(parseInt(clean.slice(0,2),16)/255),round(parseInt(clean.slice(2,4),16)/255),round(parseInt(clean.slice(4,6),16)/255),1]
}
const same=(a:number[],b:number[])=>a.length>=4&&b.length>=4&&a.slice(0,4).every((v,i)=>Math.abs(v-b[i])<.012)

export function themeFirstPartyLottie<T extends JsonValue>(animationData:T,brand:LottieBrandRoles):T{
  const replacements=Object.entries(TOKENS).map(([key,value])=>({from:value,to:hexToLottieColor(brand[key as keyof LottieBrandRoles])}))
  const clone=structuredClone(animationData)
  const visit=(value:JsonValue):JsonValue=>{
    if(Array.isArray(value)){
      if(value.length>=4&&value.slice(0,4).every(x=>typeof x==='number')){
        const numeric=value as number[]
        const replacement=replacements.find(x=>same(numeric,x.from))
        if(replacement)return [...replacement.to,...numeric.slice(4)] as JsonValue
      }
      return value.map(visit)
    }
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value))value[key]=visit(child)
      return value
    }
    return value
  }
  return visit(clone) as T
}

export function assertNoUnknownLottiePalette(animationData:JsonValue){
  const colors:{path:string;color:number[]}[]=[]
  const walk=(value:JsonValue,path='root')=>{
    if(Array.isArray(value)){if(value.length===4&&value.every(x=>typeof x==='number')&&value.every(x=>x>=0&&x<=1))colors.push({path,color:value as number[]});value.forEach((x,i)=>walk(x,`${path}[${i}]`));return}
    if(value&&typeof value==='object')for(const [k,v] of Object.entries(value))walk(v,`${path}.${k}`)
  }
  walk(animationData)
  const unknown=colors.filter(x=>!Object.values(TOKENS).some(token=>same(x.color,token)))
  return {colorsFound:colors.length,unknown}
}
