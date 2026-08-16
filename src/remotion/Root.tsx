import { Composition } from 'remotion'
import { RouteJourneyVertical } from './compositions/RouteJourneyVertical'
import { DataCascadeVertical } from './compositions/DataCascadeVertical'
import { ProcessConnectedVertical } from './compositions/ProcessConnectedVertical'
import { ProductionMasterVertical } from './compositions/ProductionMasterVertical'

const demoBrand={surface:'#ffffff',surfaceAlt:'#f4f7f8',ink:'#172126',muted:'#627078',primary:'#087fb6',secondary:'#d8f2fa',accent:'#8a2f53',line:'#d8e1e5'}
const base={brand:demoBrand,title:'Título de producción',subtitle:'Contenido de demostración. Sustituir por información verificada.'}
const durationMetadata=(fallback:number)=>({props}:{props:{durationSeconds?:number}})=>({durationInFrames:Math.round((props.durationSeconds??fallback)*30)})

export const RemotionRoot=()=> <>
  <Composition id="CE-RouteJourney" component={RouteJourneyVertical} width={1080} height={1920} fps={30} durationInFrames={900} calculateMetadata={durationMetadata(30)} defaultProps={{brand:demoBrand,title:'Ruta programada',stops:['Destino 1','Destino 2','Destino 3'],groups:[{label:'DÍA 01',items:['Destino 1','Destino 2']},{label:'DÍA 02',items:['Destino 3','Destino 4']},{label:'DÍA 03',items:['Destino 5','Destino 6']}],highlight:'Dato principal validado',footer:'Información verificada en producción',durationSeconds:30}}/>
  <Composition id="CE-DataCascade" component={DataCascadeVertical} width={1080} height={1920} fps={30} durationInFrames={600} calculateMetadata={durationMetadata(20)} defaultProps={{brand:demoBrand,title:'Resultados',metrics:[{value:'00',label:'Métrica validada'},{value:'00',label:'Métrica validada'},{value:'00',label:'Métrica validada'}],durationSeconds:20}}/>
  <Composition id="CE-ProcessConnected" component={ProcessConnectedVertical} width={1080} height={1920} fps={30} durationInFrames={900} calculateMetadata={durationMetadata(30)} defaultProps={{brand:demoBrand,title:'Cómo funciona',steps:['Etapa 1','Etapa 2','Etapa 3','Etapa 4'],durationSeconds:30}}/>
  <Composition id="CE-LaunchEditorial" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={900} calculateMetadata={durationMetadata(30)} defaultProps={{...base,variant:'launch' as const,kicker:'LANZAMIENTO',metrics:[{value:'01',label:'beneficio'},{value:'02',label:'dato'},{value:'03',label:'siguiente paso'}],durationSeconds:30}}/>
  <Composition id="CE-DocumentaryEvidence" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={1350} calculateMetadata={durationMetadata(45)} defaultProps={{...base,variant:'documentary' as const,kicker:'EVIDENCIA DOCUMENTAL',items:['Intervención verificada'],metrics:[{value:'00',label:'métrica validada'}],durationSeconds:45}}/>
  <Composition id="CE-BeforeAfter" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={900} calculateMetadata={durationMetadata(30)} defaultProps={{...base,variant:'before-after' as const,kicker:'ANTES / DESPUÉS',metrics:[{value:'DELTA',label:'cambio verificable'}],durationSeconds:30}}/>
  <Composition id="CE-TimelineTerritory" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={1350} calculateMetadata={durationMetadata(45)} defaultProps={{...base,variant:'timeline' as const,kicker:'ETAPAS',items:['Etapa 1','Etapa 2','Etapa 3','Etapa 4'],durationSeconds:45}}/>
  <Composition id="CE-TestimonialQuote" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={900} calculateMetadata={durationMetadata(30)} defaultProps={{...base,variant:'testimonial' as const,kicker:'TESTIMONIO',quote:'Cita autorizada',attribution:'Identidad autorizada',durationSeconds:30}}/>
  <Composition id="CE-NoticeAlert" component={ProductionMasterVertical} width={1080} height={1920} fps={30} durationInFrames={600} calculateMetadata={durationMetadata(20)} defaultProps={{...base,variant:'alert' as const,kicker:'AVISO',label:'AVISO OPERATIVO',items:['Situación confirmada','Zona, acción y siguiente actualización verificadas.'],durationSeconds:20}}/>
</>
