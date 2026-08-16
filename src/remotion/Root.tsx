import { Composition } from 'remotion'
import { RouteJourneyVertical } from './compositions/RouteJourneyVertical'
import { DataCascadeVertical } from './compositions/DataCascadeVertical'
import { ProcessConnectedVertical } from './compositions/ProcessConnectedVertical'

const demoBrand={surface:'#ffffff',ink:'#172126',primary:'#087fb6',secondary:'#d8f2fa',accent:'#8a2f53',line:'#d8e1e5'}

export const RemotionRoot=()=> <>
  <Composition id="CE-RouteJourney" component={RouteJourneyVertical} width={1080} height={1920} fps={30} durationInFrames={900} defaultProps={{brand:demoBrand,title:'Ruta programada',stops:['Destino 1','Destino 2','Destino 3']}}/>
  <Composition id="CE-DataCascade" component={DataCascadeVertical} width={1080} height={1920} fps={30} durationInFrames={600} defaultProps={{brand:demoBrand,title:'Resultados',metrics:[{value:'00',label:'Métrica validada'},{value:'00',label:'Métrica validada'},{value:'00',label:'Métrica validada'}]}}/>
  <Composition id="CE-ProcessConnected" component={ProcessConnectedVertical} width={1080} height={1920} fps={30} durationInFrames={900} defaultProps={{brand:demoBrand,title:'Cómo funciona',steps:['Etapa 1','Etapa 2','Etapa 3','Etapa 4']}}/>
</>
