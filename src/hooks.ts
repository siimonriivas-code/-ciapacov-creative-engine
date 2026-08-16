import {useEffect,useState} from 'react'

export function useLocalSet(key:string){
  const [values,setValues]=useState<Set<string>>(()=>{
    try{return new Set(JSON.parse(localStorage.getItem(key)||'[]'))}catch{return new Set()}
  })
  useEffect(()=>{localStorage.setItem(key,JSON.stringify([...values]))},[key,values])
  const toggle=(id:string)=>setValues(prev=>{const next=new Set(prev);next.has(id)?next.delete(id):next.add(id);return next})
  return {values,toggle}
}
