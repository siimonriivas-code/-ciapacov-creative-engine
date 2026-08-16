export type TemplateStatus = 'premium' | 'approved' | 'experimental'
export type AssetStatus = TemplateStatus | 'slot' | 'deprecated'
export type Template = {
  id:string; name:string; type:string; subtype:string; format:string; density:string; motion:string;
  photo:string; route:boolean; data:boolean; status:TemplateStatus; tags:string[]; description:string;
  recipe:string; pack:string; duration?:number; loadPolicy:string; brandMode:string; demoContent:string; implementation:string
}
export type MotionRecipe = { id:string; name:string; engine:'motion'|'gsap'; category:string; intensity:string; tags:string[]; bestFor:string[]; description:string; params:Record<string,unknown> }
export type Campaign = { id:string; name:string; status:TemplateStatus; tags:string[]; description:string; templates:string[] }
export type Domain = { id:string; name:string; description:string; keywords:string[]; recommendedMasters:string[] }
export type OperationalMaster = {
  id:string; domain:string; name:string; objective:string; formats:string[]; templateIds:string[];
  requiredCapabilities:string[]; recommendedCapabilities:string[]; materials:string[]; status:TemplateStatus
}
export type AssetRecord = {
  id:string; name:string; category:string; capabilities:string[]; file:string|null; status:AssetStatus;
  availability:'bundled'|'external-required'|'external-linked'; source:string;
  license:{kind:string;redistributable:boolean}; tags:string[]; notes:string
}
export type ReferenceSource = {
  id:string; name:string; kind:string; policy:string; strengths:string[]; allowed:string; forbidden:string
}
export type CreativeBrief = { topic:string; format?:string; objective?:string; tone?:string; materials?:string[]; duration?:number; constraints?:string[] }
export type AssetResolution = { capability:string; asset:AssetRecord|null; state:'ready'|'slot'|'missing' }
export type StoryboardBeat = { id:string; purpose:string; fields:string[]; capability:string; motion:string }
export type MasterStoryboard = {
  id:string; masterId:string; name:string; formatStrategy:string; beats:StoryboardBeat[];
  rules:{demoData:string;brand:string;overflow:string}; status:'production-ready'|'draft'
}
export type ProductionPlan = {
  master:OperationalMaster; storyboard:MasterStoryboard; templates:Template[];
  requiredAssets:AssetResolution[]; recommendedAssets:AssetResolution[]; readiness:number;
  blockers:string[]
}
