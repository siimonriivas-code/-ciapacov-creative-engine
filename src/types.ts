export type TemplateStatus = 'premium' | 'approved' | 'experimental'
export type Template = {
  id:string; name:string; type:string; subtype:string; format:string; density:string; motion:string;
  photo:string; route:boolean; data:boolean; status:TemplateStatus; tags:string[]; description:string;
  recipe:string; pack:string; duration?:number; loadPolicy:string; brandMode:string; demoContent:string; implementation:string
}
export type MotionRecipe = { id:string; name:string; engine:'motion'|'gsap'; category:string; intensity:string; tags:string[]; bestFor:string[]; description:string; params:Record<string,unknown> }
export type Campaign = { id:string; name:string; status:TemplateStatus; tags:string[]; description:string; templates:string[] }
