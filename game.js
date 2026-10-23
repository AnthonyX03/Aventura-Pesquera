(() => {
'use strict';
const $=id=>document.getElementById(id), screens=['intro','menu','fishing','zones','upgrades','encyclopedia','hold','settings','boat','treasures','aquarium','missions','achievements','gacha','stats','baits'];
const zones=[
{name:'Costa tranquila',emoji:'🏝️',desc:'Aguas poco profundas, ideales para empezar.',price:0,depth:'0–30 m',color:['#a0e7df','#1c91a8'],pool:[0,1,2,3,4,5,6,7,8,9,10,11],bonus:1},
{name:'Bahía de coral',emoji:'🪸',desc:'Arrecifes coloridos llenos de especies curiosas.',price:4500,depth:'20–90 m',color:['#9de1d0','#177d9b'],pool:[4,5,14,15,16,17,18,19,20,34,44,50],bonus:1.25},
{name:'Laguna esmeralda',emoji:'🌿',desc:'Aguas verdes y tranquilas con peces de gran valor.',price:18000,depth:'10–120 m',color:['#91d8bb','#116c7e'],pool:[7,8,27,28,40,41,42,43,49,50,51,59],bonus:1.55},
{name:'Mar abierto',emoji:'🌊',desc:'Grandes peces y corrientes más rápidas.',price:55000,depth:'50–250 m',color:['#69c9d7','#07567e'],pool:[9,10,11,12,13,21,22,25,26,35,36,52,53],bonus:2.1},
{name:'Archipiélago tropical',emoji:'🌺',desc:'Un paraíso de especies exóticas y colores brillantes.',price:140000,depth:'30–300 m',color:['#9ce5dc','#146f92'],pool:[15,16,17,18,19,20,34,39,44,45,46,49,50,51,56],bonus:3.2},
{name:'Aguas heladas',emoji:'🧊',desc:'Frías aguas donde habitan especies resistentes.',price:320000,depth:'100–400 m',color:['#d0f3ed','#327eac'],pool:[10,11,13,22,23,24,25,26,35,36,37,42,53,54],bonus:4.5},
{name:'Fosa abisal',emoji:'🌑',desc:'Oscuridad profunda y criaturas extraordinarias.',price:720000,depth:'300–700 m',color:['#4989a5','#071f4d'],pool:[29,30,37,38,48,54,55,56,57,58],bonus:6.5},
{name:'Cementerio de barcos',emoji:'⚓',desc:'Restos antiguos esconden especies casi olvidadas.',price:1900000,depth:'80–500 m',color:['#83b5ba','#123c62'],pool:[21,27,28,36,37,38,42,48,52,54,55,56,57],bonus:9},
{name:'Mar de las estrellas',emoji:'✨',desc:'Un océano luminoso donde aparecen peces legendarios.',price:5200000,depth:'200–800 m',color:['#9cbbe9','#342b79'],pool:[29,30,37,38,39,48,54,55,56,57,58,59],bonus:13},
{name:'Reino de Leviatán',emoji:'🐉',desc:'El límite del mundo conocido. Solo para capitanes expertos.',price:14000000,depth:'500–900 m',color:['#c1b0e9','#201748'],pool:[37,38,54,55,56,57,58,59],bonus:20},
{name:'Zona Secreta',emoji:'🌀',desc:'Un pliegue del océano solo visible con el Portal secreto y el logro Explorador.',price:0,depth:'??? m',color:['#1a0a2e','#4c1d95'],pool:[54,55,56,57,58,59,37,38],secret:true}
];
const EVENT_ZONES=[
{id:'ez0',name:'Bahía del Festival',emoji:'🎉',desc:'Solo en festivales costeros. Peces de feria y colores vivos.',unlockAt:2,color:['#fde68a','#f59e0b'],pool:['ev0','ev1','ev2','ev3','ev4','ev25','ev26','ev27'],bonus:3},
{id:'ez1',name:'Arrecife de Cristal',emoji:'💎',desc:'Aguas de cristal durante la Noche de cristal.',unlockAt:4,color:['#e0e7ff','#6366f1'],pool:['ev5','ev6','ev7','ev8','ev28','ev29','ev30'],bonus:6},
{id:'ez2',name:'Canal del Eclipse',emoji:'🌑',desc:'Se abre con el Eclipse abisal.',unlockAt:6,color:['#1e1b4b','#4c1d95'],pool:['ev9','ev10','ev11','ev12','ev31','ev32','ev33'],bonus:10},
{id:'ez3',name:'Niebla de Ánimas',emoji:'👻',desc:'La Niebla fantasma revela este paso.',unlockAt:7,color:['#334155','#64748b'],pool:['ev13','ev14','ev15','ev16','ev34','ev35','ev36'],bonus:12},
{id:'ez4',name:'Migración Dorada',emoji:'🐟',desc:'Paso de cardúmenes legendarios.',unlockAt:5,color:['#fef3c7','#d97706'],pool:['ev17','ev18','ev19','ev20','ev37','ev38','ev39'],bonus:8},
{id:'ez5',name:'Umbral del Portal',emoji:'🌀',desc:'Borde del mundo durante el Portal secreto.',unlockAt:9,color:['#2e1065','#7c3aed'],pool:['ev21','ev22','ev23','ev24','ev40','ev41','ev42'],bonus:18}
];
const EVENT_FISH=[
['Pez confeti','🎊',40,1.2,1,'ev0'],['Carpa de feria','🎏',55,1.5,1,'ev1'],['Gobio luminoso','✨',70,1.1,2,'ev2'],['Sardina dorada','🟡',90,1.3,2,'ev3'],['Mariposa marina','🦋',120,1.4,2,'ev4'],
['Tetra de cristal','💎',150,1.2,3,'ev5'],['Gema nadadora','💠',200,1.5,3,'ev6'],['Pez prisma','🔮',280,1.6,3,'ev7'],['Cristalino mayor','🧊',400,2.0,4,'ev8'],
['Sombra del eclipse','🌑',350,2.2,4,'ev9'],['Ojo abisal','👁️',450,2.5,4,'ev10'],['Serpiente lunar','🌙',600,2.8,4,'ev11'],['Devorador de sol','☀️',900,3.2,5,'ev12'],
['Ánima brumosa','👻',380,2.0,4,'ev13'],['Espectro de algas','🌿',420,2.1,4,'ev14'],['Pez fantasma','🦴',550,2.4,4,'ev15'],['Capitán sin rostro','☠️',800,3.0,5,'ev16'],
['Atún migratorio','🐟',220,2.5,3,'ev17'],['Rey de la migración','👑',500,3.5,4,'ev18'],['Cardumen de oro','✨',650,2.8,4,'ev19'],['Leviatán joven','🐉',1000,4.0,5,'ev20'],
['Guardian del umbral','🌀',700,3.0,4,'ev21'],['Pez portal','🕳️',850,3.2,5,'ev22'],['Eco del vacío','📡',950,2.9,5,'ev23'],['Primordial','🌌',1500,5.0,5,'ev24'],
['Tamboril festivo','🥁',48,1.3,1,'ev25'],['Payaso de muelle','🤡',62,1.4,1,'ev26'],['Estrella de feria','⭐',95,1.2,2,'ev27'],
['Cuarzo nadador','🪨',160,1.3,2,'ev28'],['Aguamarina','🩵',210,1.5,3,'ev29'],['Diamante vivo','💎',320,1.8,3,'ev30'],
['Eclipsoide','🌑',380,2.0,3,'ev31'],['Manto negro','🦇',480,2.3,4,'ev32'],['Corona solar','👑',720,2.6,4,'ev33'],
['Susurro','💨',400,1.9,3,'ev34'],['Velo gris','🌫️',460,2.2,4,'ev35'],['Lamento salado','😭',580,2.5,4,'ev36'],
['Corredor dorado','🏃',250,2.4,2,'ev37'],['Plata del cardumen','🥈',340,2.6,3,'ev38'],['Emperador migrante','👑',720,3.2,4,'ev39'],
['Grieta','💥',760,3.1,4,'ev40'],['Eco púrpura','🟣',880,3.3,5,'ev41'],['Semilla del vacío','🌱',1200,4.5,5,'ev42']
];
const EVENT_PREFIXES=['Festivo','Cristalino','Eclipse','Espectral','Migratorio','Umbral','Dorado','Brumoso','Lunar','Prismático','Carnaval','Abisal','Celeste','Runico','Iridescente','Sombrío','Radiante','Arcano','Efímero','Eterno','Violeta','Ámbar','Nácar','Ópalo','Carmesí'];
const EVENT_SUFFIXES=['de feria','de cristal','del eclipse','de niebla','dorada','del portal','de medianoche','luminoso','perdido','ancestral','viviente','roto','sagrado','maldito','pulido','salvaje','menor','mayor','real','oculto','del vacío','de mareas','de estrellas','de coral','de sombra'];
const baseFish=[
['Sardina','🐟',8,0],['Boquerón','🐟',9,0],['Caballa','🐟',14,0],['Jurel','🐟',13,0],['Dorada','🐠',22,1],['Lubina','🐟',29,1],['Salmonete','🐟',18,0],['Trucha','🐟',20,1],['Carpa','🐟',17,0],['Atún','🐟',55,2],['Salmón','🐟',42,1],['Bacalao','🐟',38,1],['Pez espada','🐠',90,2],['Mero','🐠',48,1],['Rodaballo','🐟',45,1],['Pez globo','🐡',36,1],['Pez payaso','🐠',42,1],['Pez león','🐠',57,2],['Pez ángel','🐠',50,1],['Pez mariposa','🐠',40,1],['Pez loro','🐠',46,1],['Barracuda','🐟',70,2],['Tiburón azul','🦈',130,3],['Tiburón martillo','🦈',210,3],['Gran tiburón blanco','🦈',320,4],['Raya','🐟',55,1],['Mantarraya','🐟',145,3],['Anguila','🐍',47,1],['Morena','🐍',62,2],['Pez linterna','🐠',75,2],['Pez abisal','🐟',95,2],['Calamar','🦑',40,1],['Pulpo','🐙',56,1],['Sepia','🦑',36,0],['Caballito de mar','🐠',72,2],['Pez luna','🐟',95,2],['Pez remo','🐟',125,2],['Celacanto','🐟',260,4],['Pez dragón','🐉',190,3],['Pez cristal','🐠',120,3],['Piraña','🐟',45,1],['Arowana','🐟',150,3],['Esturión','🐟',88,2],['Pez koi','🐠',135,3],['Pez mandarín','🐠',105,2],['Pez unicornio','🐠',140,3],['Pez cofre','🐡',80,2],['Pez hacha','🐟',92,2],['Pez víbora','🐟',155,3],['Pez telescopio','🐠',115,2],['Pez disco','🐠',98,2],['Pez cirujano','🐠',84,2],['Pez zorro','🐟',160,3],['Pez vela','🐟',195,3],['Pez remo gigante','🐟',290,4],['Pez abisal fantasma','👻',390,4],['Pez cometa','🌠',470,4],['Dragón marino','🐉',680,5],['Pez de cristal lunar','💎',820,5],['Leviatán juvenil','🐲',1200,5],['Rey de las profundidades','👑',2500,5]
];
const rarities=['Común','Poco común','Raro','Épico','Legendario','Mítico'], rColors=['#c9d7e2','#6ee7b7','#60a5fa','#c084fc','#fbbf24','#fb7185'];
const prefixes=['Azul','Dorado','Plateado','Rojo','Gigante','Enano','Rayado','Lunar','Sombrío','Coralino','Ártico','Tropical','Luminoso','Veloz','Antiguo','Cristalino','Volcánico','Abisal','Espectral','Iridescente'];
const suffixes=['de arrecife','de las profundidades','de luna','de las mareas','del océano','de aguas cálidas','de aguas heladas','de coral','de la tormenta','del crepúsculo','de la noche','de la aurora','del abismo','de las estrellas','de la niebla','de la laguna','de los naufragios','del horizonte'];
const baseMinZone=baseFish.map((_,bi)=>{for(let zi=0;zi<zones.length;zi++)if(zones[zi].pool.includes(bi))return zi;return 0});
const baseZoneNames=baseFish.map((_,bi)=>zones.filter(z=>z.pool.includes(bi)).map(z=>z.name));

const FIXED_FISH_NAMES=["Sardina azul", "Boquerón Atlántico", "Caballa azul Atlántico", "Atlántico jurel", "Dorada de atlántico", "Lubina azul", "Salmonete Atlántico", "Trucha azul Atlántico", "Atlántico carpa", "Róbalo de atlántico", "Atún azul", "Bonito Atlántico", "Pez espada azul Atlántico", "Atlántico mero", "Pargo de atlántico", "Cherna azul", "Raya Atlántico", "Tiburón azul Atlántico", "Atlántico pez luna", "Anguila de atlántico", "Congrio azul", "Rape Atlántico", "Rodaballo azul Atlántico", "Atlántico lenguado", "Platija de atlántico", "Anchoa azul", "Arenque Atlántico", "Salmón azul Atlántico", "Atlántico bacalao", "Abadejo de atlántico", "Merluza azul", "Pez payaso Atlántico", "Cirujano azul Atlántico", "Atlántico loro", "Mariposa de atlántico", "Murena azul", "Barracuda Atlántico", "Pez globo azul Atlántico", "Atlántico caballito", "Medusa de atlántico", "Calamar azul", "Pulpo Atlántico", "Sepia azul Atlántico", "Atlántico nautilo", "Estrella de atlántico", "Erizo azul", "Cangrejo Atlántico", "Langosta azul Atlántico", "Atlántico bogavante", "Nécora de atlántico", "Sardina dorada", "Boquerón Atlántico del este", "Caballa dorada Atlántico", "Atlántico jurel del este", "Dorada de atlántico del este", "Lubina dorada", "Salmonete Atlántico del este", "Trucha dorada Atlántico", "Atlántico carpa del este", "Róbalo de atlántico del este", "Atún dorada", "Bonito Atlántico del este", "Pez espada dorada Atlántico", "Atlántico mero del este", "Pargo de atlántico del este", "Cherna dorada", "Raya Atlántico del este", "Tiburón dorada Atlántico", "Atlántico pez luna del este", "Anguila de atlántico del este", "Congrio dorada", "Rape Atlántico del este", "Rodaballo dorada Atlántico", "Atlántico lenguado del este", "Platija de atlántico del este", "Anchoa dorada", "Arenque Atlántico del este", "Salmón dorada Atlántico", "Atlántico bacalao del este", "Abadejo de atlántico del este", "Merluza dorada", "Pez payaso Atlántico del este", "Cirujano dorada Atlántico", "Atlántico loro del este", "Mariposa de atlántico del este", "Murena dorada", "Barracuda Atlántico del este", "Pez globo dorada Atlántico", "Atlántico caballito del este", "Medusa de atlántico del este", "Calamar dorada", "Pulpo Atlántico del este", "Sepia dorada Atlántico", "Atlántico nautilo del este", "Estrella de atlántico del este", "Erizo dorada", "Cangrejo Atlántico del este", "Langosta dorada Atlántico", "Atlántico bogavante del este", "Nécora de atlántico del este", "Sardina plateada", "Boquerón Atlántico del oeste", "Caballa plateada Atlántico", "Atlántico jurel del oeste", "Dorada de atlántico del oeste", "Lubina plateada", "Salmonete Atlántico del oeste", "Trucha plateada Atlántico", "Atlántico carpa del oeste", "Róbalo de atlántico del oeste", "Atún plateada", "Bonito Atlántico del oeste", "Pez espada plateada Atlántico", "Atlántico mero del oeste", "Pargo de atlántico del oeste", "Cherna plateada", "Raya Atlántico del oeste", "Tiburón plateada Atlántico", "Atlántico pez luna del oeste", "Anguila de atlántico del oeste", "Congrio plateada", "Rape Atlántico del oeste", "Rodaballo plateada Atlántico", "Atlántico lenguado del oeste", "Platija de atlántico del oeste", "Anchoa plateada", "Arenque Atlántico del oeste", "Salmón plateada Atlántico", "Atlántico bacalao del oeste", "Abadejo de atlántico del oeste", "Merluza plateada", "Pez payaso Atlántico del oeste", "Cirujano plateada Atlántico", "Atlántico loro del oeste", "Mariposa de atlántico del oeste", "Murena plateada", "Barracuda Atlántico del oeste", "Pez globo plateada Atlántico", "Atlántico caballito del oeste", "Medusa de atlántico del oeste", "Calamar plateada", "Pulpo Atlántico del oeste", "Sepia plateada Atlántico", "Atlántico nautilo del oeste", "Estrella de atlántico del oeste", "Erizo plateada", "Cangrejo Atlántico del oeste", "Langosta plateada Atlántico", "Atlántico bogavante del oeste", "Nécora de atlántico del oeste", "Sardina coralina", "Boquerón Atlántico del norte", "Caballa coralina Atlántico", "Atlántico jurel del norte", "Dorada de atlántico del norte", "Lubina coralina", "Salmonete Atlántico del norte", "Trucha coralina Atlántico", "Atlántico carpa del norte", "Róbalo de atlántico del norte", "Atún coralina", "Bonito Atlántico del norte", "Pez espada coralina Atlántico", "Atlántico mero del norte", "Pargo de atlántico del norte", "Cherna coralina", "Raya Atlántico del norte", "Tiburón coralina Atlántico", "Atlántico pez luna del norte", "Anguila de atlántico del norte", "Congrio coralina", "Rape Atlántico del norte", "Rodaballo coralina Atlántico", "Atlántico lenguado del norte", "Platija de atlántico del norte", "Anchoa coralina", "Arenque Atlántico del norte", "Salmón coralina Atlántico", "Atlántico bacalao del norte", "Abadejo de atlántico del norte", "Merluza coralina", "Pez payaso Atlántico del norte", "Cirujano coralina Atlántico", "Atlántico loro del norte", "Mariposa de atlántico del norte", "Murena coralina", "Barracuda Atlántico del norte", "Pez globo coralina Atlántico", "Atlántico caballito del norte", "Medusa de atlántico del norte", "Calamar coralina", "Pulpo Atlántico del norte", "Sepia coralina Atlántico", "Atlántico nautilo del norte", "Estrella de atlántico del norte", "Erizo coralina", "Cangrejo Atlántico del norte", "Langosta coralina Atlántico", "Atlántico bogavante del norte", "Nécora de atlántico del norte", "Sardina abisal", "Boquerón Atlántico del sur", "Caballa abisal Atlántico", "Atlántico jurel del sur", "Dorada de atlántico del sur", "Lubina abisal", "Salmonete Atlántico del sur", "Trucha abisal Atlántico", "Atlántico carpa del sur", "Róbalo de atlántico del sur", "Atún abisal", "Bonito Atlántico del sur", "Pez espada abisal Atlántico", "Atlántico mero del sur", "Pargo de atlántico del sur", "Cherna abisal", "Raya Atlántico del sur", "Tiburón abisal Atlántico", "Atlántico pez luna del sur", "Anguila de atlántico del sur", "Congrio abisal", "Rape Atlántico del sur", "Rodaballo abisal Atlántico", "Atlántico lenguado del sur", "Platija de atlántico del sur", "Anchoa abisal", "Arenque Atlántico del sur", "Salmón abisal Atlántico", "Atlántico bacalao del sur", "Abadejo de atlántico del sur", "Merluza abisal", "Pez payaso Atlántico del sur", "Cirujano abisal Atlántico", "Atlántico loro del sur", "Mariposa de atlántico del sur", "Murena abisal", "Barracuda Atlántico del sur", "Pez globo abisal Atlántico", "Atlántico caballito del sur", "Medusa de atlántico del sur", "Calamar abisal", "Pulpo Atlántico del sur", "Sepia abisal Atlántico", "Atlántico nautilo del sur", "Estrella de atlántico del sur", "Erizo abisal", "Cangrejo Atlántico del sur", "Langosta abisal Atlántico", "Atlántico bogavante del sur", "Nécora de atlántico del sur", "Sardina lunar", "Boquerón Atlántico costero", "Caballa lunar Atlántico", "Atlántico jurel costero", "Dorada de atlántico costero", "Lubina lunar", "Salmonete Atlántico costero", "Trucha lunar Atlántico", "Atlántico carpa costero", "Róbalo de atlántico costero", "Atún lunar", "Bonito Atlántico costero", "Pez espada lunar Atlántico", "Atlántico mero costero", "Pargo de atlántico costero", "Cherna lunar", "Raya Atlántico costero", "Tiburón lunar Atlántico", "Atlántico pez luna costero", "Anguila de atlántico costero", "Congrio lunar", "Rape Atlántico costero", "Rodaballo lunar Atlántico", "Atlántico lenguado costero", "Platija de atlántico costero", "Anchoa lunar", "Arenque Atlántico costero", "Salmón lunar Atlántico", "Atlántico bacalao costero", "Abadejo de atlántico costero", "Merluza lunar", "Pez payaso Atlántico costero", "Cirujano lunar Atlántico", "Atlántico loro costero", "Mariposa de atlántico costero", "Murena lunar", "Barracuda Atlántico costero", "Pez globo lunar Atlántico", "Atlántico caballito costero", "Medusa de atlántico costero", "Calamar lunar", "Pulpo Atlántico costero", "Sepia lunar Atlántico", "Atlántico nautilo costero", "Estrella de atlántico costero", "Erizo lunar", "Cangrejo Atlántico costero", "Langosta lunar Atlántico", "Atlántico bogavante costero", "Nécora de atlántico costero", "Sardina del norte", "Boquerón Atlántico oceánico", "Caballa del norte Atlántico", "Atlántico jurel oceánico", "Dorada de atlántico oceánico", "Lubina del norte", "Salmonete Atlántico oceánico", "Trucha del norte Atlántico", "Atlántico carpa oceánico", "Róbalo de atlántico oceánico", "Atún del norte", "Bonito Atlántico oceánico", "Pez espada del norte Atlántico", "Atlántico mero oceánico", "Pargo de atlántico oceánico", "Cherna del norte", "Raya Atlántico oceánico", "Tiburón del norte Atlántico", "Atlántico pez luna oceánico", "Anguila de atlántico oceánico", "Congrio del norte", "Rape Atlántico oceánico", "Rodaballo del norte Atlántico", "Atlántico lenguado oceánico", "Platija de atlántico oceánico", "Anchoa del norte", "Arenque Atlántico oceánico", "Salmón del norte Atlántico", "Atlántico bacalao oceánico", "Abadejo de atlántico oceánico", "Merluza del norte", "Pez payaso Atlántico oceánico", "Cirujano del norte Atlántico", "Atlántico loro oceánico", "Mariposa de atlántico oceánico", "Murena del norte", "Barracuda Atlántico oceánico", "Pez globo del norte Atlántico", "Atlántico caballito oceánico", "Medusa de atlántico oceánico", "Calamar del norte", "Pulpo Atlántico oceánico", "Sepia del norte Atlántico", "Atlántico nautilo oceánico", "Estrella de atlántico oceánico", "Erizo del norte", "Cangrejo Atlántico oceánico", "Langosta del norte Atlántico", "Atlántico bogavante oceánico", "Nécora de atlántico oceánico", "Sardina del sur", "Boquerón Atlántico menor", "Caballa del sur Atlántico", "Atlántico jurel menor", "Dorada de atlántico menor", "Lubina del sur", "Salmonete Atlántico menor", "Trucha del sur Atlántico", "Atlántico carpa menor", "Róbalo de atlántico menor", "Atún del sur", "Bonito Atlántico menor", "Pez espada del sur Atlántico", "Atlántico mero menor", "Pargo de atlántico menor", "Cherna del sur", "Raya Atlántico menor", "Tiburón del sur Atlántico", "Atlántico pez luna menor", "Anguila de atlántico menor", "Congrio del sur", "Rape Atlántico menor", "Rodaballo del sur Atlántico", "Atlántico lenguado menor", "Platija de atlántico menor", "Anchoa del sur", "Arenque Atlántico menor", "Salmón del sur Atlántico", "Atlántico bacalao menor", "Abadejo de atlántico menor", "Merluza del sur", "Pez payaso Atlántico menor", "Cirujano del sur Atlántico", "Atlántico loro menor", "Mariposa de atlántico menor", "Murena del sur", "Barracuda Atlántico menor", "Pez globo del sur Atlántico", "Atlántico caballito menor", "Medusa de atlántico menor", "Calamar del sur", "Pulpo Atlántico menor", "Sepia del sur Atlántico", "Atlántico nautilo menor", "Estrella de atlántico menor", "Erizo del sur", "Cangrejo Atlántico menor", "Langosta del sur Atlántico", "Atlántico bogavante menor", "Nécora de atlántico menor", "Sardina del este", "Boquerón Atlántico mayor", "Caballa del este Atlántico", "Atlántico jurel mayor", "Dorada de atlántico mayor", "Lubina del este", "Salmonete Atlántico mayor", "Trucha del este Atlántico", "Atlántico carpa mayor", "Róbalo de atlántico mayor", "Atún del este", "Bonito Atlántico mayor", "Pez espada del este Atlántico", "Atlántico mero mayor", "Pargo de atlántico mayor", "Cherna del este", "Raya Atlántico mayor", "Tiburón del este Atlántico", "Atlántico pez luna mayor", "Anguila de atlántico mayor", "Congrio del este", "Rape Atlántico mayor", "Rodaballo del este Atlántico", "Atlántico lenguado mayor", "Platija de atlántico mayor", "Anchoa del este", "Arenque Atlántico mayor", "Salmón del este Atlántico", "Atlántico bacalao mayor", "Abadejo de atlántico mayor", "Merluza del este", "Pez payaso Atlántico mayor", "Cirujano del este Atlántico", "Atlántico loro mayor", "Mariposa de atlántico mayor", "Murena del este", "Barracuda Atlántico mayor", "Pez globo del este Atlántico", "Atlántico caballito mayor", "Medusa de atlántico mayor", "Calamar del este", "Pulpo Atlántico mayor", "Sepia del este Atlántico", "Atlántico nautilo mayor", "Estrella de atlántico mayor", "Erizo del este", "Cangrejo Atlántico mayor", "Langosta del este Atlántico", "Atlántico bogavante mayor", "Nécora de atlántico mayor", "Sardina del oeste", "Boquerón Atlántico real", "Caballa del oeste Atlántico", "Atlántico jurel real", "Dorada de atlántico real", "Lubina del oeste", "Salmonete Atlántico real", "Trucha del oeste Atlántico", "Atlántico carpa real", "Róbalo de atlántico real", "Atún del oeste", "Bonito Atlántico real", "Pez espada del oeste Atlántico", "Atlántico mero real", "Pargo de atlántico real", "Cherna del oeste", "Raya Atlántico real", "Tiburón del oeste Atlántico", "Atlántico pez luna real", "Anguila de atlántico real", "Congrio del oeste", "Rape Atlántico real", "Rodaballo del oeste Atlántico", "Atlántico lenguado real", "Platija de atlántico real", "Anchoa del oeste", "Arenque Atlántico real", "Salmón del oeste Atlántico", "Atlántico bacalao real", "Abadejo de atlántico real", "Merluza del oeste", "Pez payaso Atlántico real", "Cirujano del oeste Atlántico", "Atlántico loro real", "Mariposa de atlántico real", "Murena del oeste", "Barracuda Atlántico real", "Pez globo del oeste Atlántico", "Atlántico caballito real", "Medusa de atlántico real", "Calamar del oeste", "Pulpo Atlántico real", "Sepia del oeste Atlántico", "Atlántico nautilo real", "Estrella de atlántico real", "Erizo del oeste", "Cangrejo Atlántico real", "Langosta del oeste Atlántico", "Atlántico bogavante real", "Nécora de atlántico real", "Sardina rayada", "Boquerón Atlántico salvaje", "Caballa rayada Atlántico", "Atlántico jurel salvaje", "Dorada de atlántico salvaje", "Lubina rayada", "Salmonete Atlántico salvaje", "Trucha rayada Atlántico", "Atlántico carpa salvaje", "Róbalo de atlántico salvaje", "Atún rayada", "Bonito Atlántico salvaje", "Pez espada rayada Atlántico", "Atlántico mero salvaje", "Pargo de atlántico salvaje", "Cherna rayada", "Raya Atlántico salvaje", "Tiburón rayada Atlántico", "Atlántico pez luna salvaje", "Anguila de atlántico salvaje", "Congrio rayada", "Rape Atlántico salvaje", "Rodaballo rayada Atlántico", "Atlántico lenguado salvaje", "Platija de atlántico salvaje", "Anchoa rayada", "Arenque Atlántico salvaje", "Salmón rayada Atlántico", "Atlántico bacalao salvaje", "Abadejo de atlántico salvaje", "Merluza rayada", "Pez payaso Atlántico salvaje", "Cirujano rayada Atlántico", "Atlántico loro salvaje", "Mariposa de atlántico salvaje", "Murena rayada", "Barracuda Atlántico salvaje", "Pez globo rayada Atlántico", "Atlántico caballito salvaje", "Medusa de atlántico salvaje", "Calamar rayada", "Pulpo Atlántico salvaje", "Sepia rayada Atlántico", "Atlántico nautilo salvaje", "Estrella de atlántico salvaje", "Erizo rayada", "Cangrejo Atlántico salvaje", "Langosta rayada Atlántico", "Atlántico bogavante salvaje", "Nécora de atlántico salvaje", "Sardina gigante", "Boquerón Atlántico de laguna", "Caballa gigante Atlántico", "Atlántico jurel de laguna", "Dorada de atlántico de laguna", "Lubina gigante", "Salmonete Atlántico de laguna", "Trucha gigante Atlántico", "Atlántico carpa de laguna", "Róbalo de atlántico de laguna", "Atún gigante", "Bonito Atlántico de laguna", "Pez espada gigante Atlántico", "Atlántico mero de laguna", "Pargo de atlántico de laguna", "Cherna gigante", "Raya Atlántico de laguna", "Tiburón gigante Atlántico", "Atlántico pez luna de laguna", "Anguila de atlántico de laguna", "Congrio gigante", "Rape Atlántico de laguna", "Rodaballo gigante Atlántico", "Atlántico lenguado de laguna", "Platija de atlántico de laguna", "Anchoa gigante", "Arenque Atlántico de laguna", "Salmón gigante Atlántico", "Atlántico bacalao de laguna", "Abadejo de atlántico de laguna", "Merluza gigante", "Pez payaso Atlántico de laguna", "Cirujano gigante Atlántico", "Atlántico loro de laguna", "Mariposa de atlántico de laguna", "Murena gigante", "Barracuda Atlántico de laguna", "Pez globo gigante Atlántico", "Atlántico caballito de laguna", "Medusa de atlántico de laguna", "Calamar gigante", "Pulpo Atlántico de laguna", "Sepia gigante Atlántico", "Atlántico nautilo de laguna", "Estrella de atlántico de laguna", "Erizo gigante", "Cangrejo Atlántico de laguna", "Langosta gigante Atlántico", "Atlántico bogavante de laguna", "Nécora de atlántico de laguna", "Sardina enana", "Boquerón Atlántico de arrecife", "Caballa enana Atlántico", "Atlántico jurel de arrecife", "Dorada de atlántico de arrecife", "Lubina enana", "Salmonete Atlántico de arrecife", "Trucha enana Atlántico", "Atlántico carpa de arrecife", "Róbalo de atlántico de arrecife", "Atún enana", "Bonito Atlántico de arrecife", "Pez espada enana Atlántico", "Atlántico mero de arrecife", "Pargo de atlántico de arrecife", "Cherna enana", "Raya Atlántico de arrecife", "Tiburón enana Atlántico", "Atlántico pez luna de arrecife", "Anguila de atlántico de arrecife", "Congrio enana", "Rape Atlántico de arrecife", "Rodaballo enana Atlántico", "Atlántico lenguado de arrecife", "Platija de atlántico de arrecife", "Anchoa enana", "Arenque Atlántico de arrecife", "Salmón enana Atlántico", "Atlántico bacalao de arrecife", "Abadejo de atlántico de arrecife", "Merluza enana", "Pez payaso Atlántico de arrecife", "Cirujano enana Atlántico", "Atlántico loro de arrecife", "Mariposa de atlántico de arrecife", "Murena enana", "Barracuda Atlántico de arrecife", "Pez globo enana Atlántico", "Atlántico caballito de arrecife", "Medusa de atlántico de arrecife", "Calamar enana", "Pulpo Atlántico de arrecife", "Sepia enana Atlántico", "Atlántico nautilo de arrecife", "Estrella de atlántico de arrecife", "Erizo enana", "Cangrejo Atlántico de arrecife", "Langosta enana Atlántico", "Atlántico bogavante de arrecife", "Nécora de atlántico de arrecife", "Sardina luminosa", "Boquerón Atlántico profundo", "Caballa luminosa Atlántico", "Atlántico jurel profundo", "Dorada de atlántico profundo", "Lubina luminosa", "Salmonete Atlántico profundo", "Trucha luminosa Atlántico", "Atlántico carpa profundo", "Róbalo de atlántico profundo", "Atún luminosa", "Bonito Atlántico profundo", "Pez espada luminosa Atlántico", "Atlántico mero profundo", "Pargo de atlántico profundo", "Cherna luminosa", "Raya Atlántico profundo", "Tiburón luminosa Atlántico", "Atlántico pez luna profundo", "Anguila de atlántico profundo", "Congrio luminosa", "Rape Atlántico profundo", "Rodaballo luminosa Atlántico", "Atlántico lenguado profundo", "Platija de atlántico profundo", "Anchoa luminosa", "Arenque Atlántico profundo", "Salmón luminosa Atlántico", "Atlántico bacalao profundo", "Abadejo de atlántico profundo", "Merluza luminosa", "Pez payaso Atlántico profundo", "Cirujano luminosa Atlántico", "Atlántico loro profundo", "Mariposa de atlántico profundo", "Murena luminosa", "Barracuda Atlántico profundo", "Pez globo luminosa Atlántico", "Atlántico caballito profundo", "Medusa de atlántico profundo", "Calamar luminosa", "Pulpo Atlántico profundo", "Sepia luminosa Atlántico", "Atlántico nautilo profundo", "Estrella de atlántico profundo", "Erizo luminosa", "Cangrejo Atlántico profundo", "Langosta luminosa Atlántico", "Atlántico bogavante profundo", "Nécora de atlántico profundo", "Sardina sombría", "Boquerón Atlántico de fiordo", "Caballa sombría Atlántico", "Atlántico jurel de fiordo", "Dorada de atlántico de fiordo", "Lubina sombría", "Salmonete Atlántico de fiordo", "Trucha sombría Atlántico", "Atlántico carpa de fiordo", "Róbalo de atlántico de fiordo", "Atún sombría", "Bonito Atlántico de fiordo", "Pez espada sombría Atlántico", "Atlántico mero de fiordo", "Pargo de atlántico de fiordo", "Cherna sombría", "Raya Atlántico de fiordo", "Tiburón sombría Atlántico", "Atlántico pez luna de fiordo", "Anguila de atlántico de fiordo", "Congrio sombría", "Rape Atlántico de fiordo", "Rodaballo sombría Atlántico", "Atlántico lenguado de fiordo", "Platija de atlántico de fiordo", "Anchoa sombría", "Arenque Atlántico de fiordo", "Salmón sombría Atlántico", "Atlántico bacalao de fiordo", "Abadejo de atlántico de fiordo", "Merluza sombría", "Pez payaso Atlántico de fiordo", "Cirujano sombría Atlántico", "Atlántico loro de fiordo", "Mariposa de atlántico de fiordo", "Murena sombría", "Barracuda Atlántico de fiordo", "Pez globo sombría Atlántico", "Atlántico caballito de fiordo", "Medusa de atlántico de fiordo", "Calamar sombría", "Pulpo Atlántico de fiordo", "Sepia sombría Atlántico", "Atlántico nautilo de fiordo", "Estrella de atlántico de fiordo", "Erizo sombría", "Cangrejo Atlántico de fiordo", "Langosta sombría Atlántico", "Atlántico bogavante de fiordo", "Nécora de atlántico de fiordo", "Sardina ártica", "Boquerón Atlántico lunar", "Caballa ártica Atlántico", "Atlántico jurel lunar", "Dorada de atlántico lunar", "Lubina ártica", "Salmonete Atlántico lunar", "Trucha ártica Atlántico", "Atlántico carpa lunar", "Róbalo de atlántico lunar", "Atún ártica", "Bonito Atlántico lunar", "Pez espada ártica Atlántico", "Atlántico mero lunar", "Pargo de atlántico lunar", "Cherna ártica", "Raya Atlántico lunar", "Tiburón ártica Atlántico", "Atlántico pez luna lunar", "Anguila de atlántico lunar", "Congrio ártica", "Rape Atlántico lunar", "Rodaballo ártica Atlántico", "Atlántico lenguado lunar", "Platija de atlántico lunar", "Anchoa ártica", "Arenque Atlántico lunar", "Salmón ártica Atlántico", "Atlántico bacalao lunar", "Abadejo de atlántico lunar", "Merluza ártica", "Pez payaso Atlántico lunar", "Cirujano ártica Atlántico", "Atlántico loro lunar", "Mariposa de atlántico lunar", "Murena ártica", "Barracuda Atlántico lunar", "Pez globo ártica Atlántico", "Atlántico caballito lunar", "Medusa de atlántico lunar", "Calamar ártica", "Pulpo Atlántico lunar", "Sepia ártica Atlántico", "Atlántico nautilo lunar", "Estrella de atlántico lunar", "Erizo ártica", "Cangrejo Atlántico lunar", "Langosta ártica Atlántico", "Atlántico bogavante lunar", "Nécora de atlántico lunar", "Sardina tropical", "Boquerón Atlántico solar", "Caballa tropical Atlántico", "Atlántico jurel solar", "Dorada de atlántico solar", "Lubina tropical", "Salmonete Atlántico solar", "Trucha tropical Atlántico", "Atlántico carpa solar", "Róbalo de atlántico solar", "Atún tropical", "Bonito Atlántico solar", "Pez espada tropical Atlántico", "Atlántico mero solar", "Pargo de atlántico solar", "Cherna tropical", "Raya Atlántico solar", "Tiburón tropical Atlántico", "Atlántico pez luna solar", "Anguila de atlántico solar", "Congrio tropical", "Rape Atlántico solar", "Rodaballo tropical Atlántico", "Atlántico lenguado solar", "Platija de atlántico solar", "Anchoa tropical", "Arenque Atlántico solar", "Salmón tropical Atlántico", "Atlántico bacalao solar", "Abadejo de atlántico solar", "Merluza tropical", "Pez payaso Atlántico solar", "Cirujano tropical Atlántico", "Atlántico loro solar", "Mariposa de atlántico solar", "Murena tropical", "Barracuda Atlántico solar", "Pez globo tropical Atlántico", "Atlántico caballito solar", "Medusa de atlántico solar", "Calamar tropical", "Pulpo Atlántico solar", "Sepia tropical Atlántico", "Atlántico nautilo solar", "Estrella de atlántico solar", "Erizo tropical", "Cangrejo Atlántico solar", "Langosta tropical Atlántico", "Atlántico bogavante solar", "Nécora de atlántico solar", "Sardina volcánica", "Boquerón Atlántico de marea", "Caballa volcánica Atlántico", "Atlántico jurel de marea", "Dorada de atlántico de marea", "Lubina volcánica", "Salmonete Atlántico de marea", "Trucha volcánica Atlántico", "Atlántico carpa de marea", "Róbalo de atlántico de marea", "Atún volcánica", "Bonito Atlántico de marea", "Pez espada volcánica Atlántico", "Atlántico mero de marea", "Pargo de atlántico de marea", "Cherna volcánica", "Raya Atlántico de marea", "Tiburón volcánica Atlántico", "Atlántico pez luna de marea", "Anguila de atlántico de marea", "Congrio volcánica", "Rape Atlántico de marea", "Rodaballo volcánica Atlántico", "Atlántico lenguado de marea", "Platija de atlántico de marea", "Anchoa volcánica", "Arenque Atlántico de marea", "Salmón volcánica Atlántico", "Atlántico bacalao de marea", "Abadejo de atlántico de marea", "Merluza volcánica", "Pez payaso Atlántico de marea", "Cirujano volcánica Atlántico", "Atlántico loro de marea", "Mariposa de atlántico de marea", "Murena volcánica", "Barracuda Atlántico de marea", "Pez globo volcánica Atlántico", "Atlántico caballito de marea", "Medusa de atlántico de marea", "Calamar volcánica", "Pulpo Atlántico de marea", "Sepia volcánica Atlántico", "Atlántico nautilo de marea", "Estrella de atlántico de marea", "Erizo volcánica", "Cangrejo Atlántico de marea", "Langosta volcánica Atlántico", "Atlántico bogavante de marea", "Nécora de atlántico de marea", "Sardina cristalina", "Boquerón Atlántico de bruma", "Caballa cristalina Atlántico", "Atlántico jurel de bruma", "Dorada de atlántico de bruma", "Lubina cristalina", "Salmonete Atlántico de bruma", "Trucha cristalina Atlántico", "Atlántico carpa de bruma", "Róbalo de atlántico de bruma", "Atún cristalina", "Bonito Atlántico de bruma", "Pez espada cristalina Atlántico", "Atlántico mero de bruma", "Pargo de atlántico de bruma", "Cherna cristalina", "Raya Atlántico de bruma", "Tiburón cristalina Atlántico", "Atlántico pez luna de bruma", "Anguila de atlántico de bruma", "Congrio cristalina", "Rape Atlántico de bruma", "Rodaballo cristalina Atlántico", "Atlántico lenguado de bruma", "Platija de atlántico de bruma", "Anchoa cristalina", "Arenque Atlántico de bruma", "Salmón cristalina Atlántico", "Atlántico bacalao de bruma", "Abadejo de atlántico de bruma", "Merluza cristalina", "Pez payaso Atlántico de bruma", "Cirujano cristalina Atlántico", "Atlántico loro de bruma", "Mariposa de atlántico de bruma", "Murena cristalina", "Barracuda Atlántico de bruma", "Pez globo cristalina Atlántico", "Atlántico caballito de bruma", "Medusa de atlántico de bruma", "Calamar cristalina", "Pulpo Atlántico de bruma", "Sepia cristalina Atlántico", "Atlántico nautilo de bruma", "Estrella de atlántico de bruma", "Erizo cristalina", "Cangrejo Atlántico de bruma", "Langosta cristalina Atlántico", "Atlántico bogavante de bruma", "Nécora de atlántico de bruma", "Sardina espectral", "Boquerón Atlántico de coral", "Caballa espectral Atlántico", "Atlántico jurel de coral", "Dorada de atlántico de coral", "Lubina espectral", "Salmonete Atlántico de coral", "Trucha espectral Atlántico", "Atlántico carpa de coral", "Róbalo de atlántico de coral", "Atún espectral", "Bonito Atlántico de coral", "Pez espada espectral Atlántico", "Atlántico mero de coral", "Pargo de atlántico de coral", "Cherna espectral", "Raya Atlántico de coral", "Tiburón espectral Atlántico", "Atlántico pez luna de coral", "Anguila de atlántico de coral", "Congrio espectral", "Rape Atlántico de coral", "Rodaballo espectral Atlántico", "Atlántico lenguado de coral", "Platija de atlántico de coral", "Anchoa espectral", "Arenque Atlántico de coral", "Salmón espectral Atlántico", "Atlántico bacalao de coral", "Abadejo de atlántico de coral", "Merluza espectral", "Pez payaso Atlántico de coral", "Cirujano espectral Atlántico", "Atlántico loro de coral", "Mariposa de atlántico de coral", "Murena espectral", "Barracuda Atlántico de coral", "Pez globo espectral Atlántico", "Atlántico caballito de coral", "Medusa de atlántico de coral", "Calamar espectral", "Pulpo Atlántico de coral", "Sepia espectral Atlántico", "Atlántico nautilo de coral", "Estrella de atlántico de coral", "Erizo espectral", "Cangrejo Atlántico de coral", "Langosta espectral Atlántico", "Atlántico bogavante de coral", "Nécora de atlántico de coral", "Sardina antigua", "Boquerón Atlántico A", "Caballa antigua Atlántico", "Atlántico jurel A", "Dorada de atlántico A", "Lubina antigua", "Salmonete Atlántico A", "Trucha antigua Atlántico", "Atlántico carpa A", "Róbalo de atlántico A", "Atún antigua", "Bonito Atlántico A", "Pez espada antigua Atlántico", "Atlántico mero A", "Pargo de atlántico A", "Cherna antigua", "Raya Atlántico A", "Tiburón antigua Atlántico", "Atlántico pez luna A", "Anguila de atlántico A", "Congrio antigua", "Rape Atlántico A", "Rodaballo antigua Atlántico", "Atlántico lenguado A", "Platija de atlántico A", "Anchoa antigua", "Arenque Atlántico A", "Salmón antigua Atlántico", "Atlántico bacalao A", "Abadejo de atlántico A", "Merluza antigua", "Pez payaso Atlántico A", "Cirujano antigua Atlántico", "Atlántico loro A", "Mariposa de atlántico A", "Murena antigua", "Barracuda Atlántico A", "Pez globo antigua Atlántico", "Atlántico caballito A", "Medusa de atlántico A", "Calamar antigua", "Pulpo Atlántico A", "Sepia antigua Atlántico", "Atlántico nautilo A", "Estrella de atlántico A", "Erizo antigua", "Cangrejo Atlántico A", "Langosta antigua Atlántico", "Atlántico bogavante A", "Nécora de atlántico A", "Sardina real", "Boquerón Atlántico B", "Caballa real Atlántico", "Atlántico jurel B", "Dorada de atlántico B", "Lubina real", "Salmonete Atlántico B", "Trucha real Atlántico", "Atlántico carpa B", "Róbalo de atlántico B", "Atún real", "Bonito Atlántico B", "Pez espada real Atlántico", "Atlántico mero B", "Pargo de atlántico B", "Cherna real", "Raya Atlántico B", "Tiburón real Atlántico", "Atlántico pez luna B", "Anguila de atlántico B", "Congrio real", "Rape Atlántico B", "Rodaballo real Atlántico", "Atlántico lenguado B", "Platija de atlántico B", "Anchoa real", "Arenque Atlántico B", "Salmón real Atlántico", "Atlántico bacalao B", "Abadejo de atlántico B", "Merluza real", "Pez payaso Atlántico B", "Cirujano real Atlántico", "Atlántico loro B", "Mariposa de atlántico B", "Murena real", "Barracuda Atlántico B", "Pez globo real Atlántico", "Atlántico caballito B", "Medusa de atlántico B", "Calamar real", "Pulpo Atlántico B", "Sepia real Atlántico", "Atlántico nautilo B", "Estrella de atlántico B", "Erizo real", "Cangrejo Atlántico B", "Langosta real Atlántico", "Atlántico bogavante B", "Nécora de atlántico B", "Sardina salvaje", "Boquerón Atlántico C", "Caballa salvaje Atlántico", "Atlántico jurel C", "Dorada de atlántico C", "Lubina salvaje", "Salmonete Atlántico C", "Trucha salvaje Atlántico", "Atlántico carpa C", "Róbalo de atlántico C", "Atún salvaje", "Bonito Atlántico C", "Pez espada salvaje Atlántico", "Atlántico mero C", "Pargo de atlántico C", "Cherna salvaje", "Raya Atlántico C", "Tiburón salvaje Atlántico", "Atlántico pez luna C", "Anguila de atlántico C", "Congrio salvaje", "Rape Atlántico C", "Rodaballo salvaje Atlántico", "Atlántico lenguado C", "Platija de atlántico C", "Anchoa salvaje", "Arenque Atlántico C", "Salmón salvaje Atlántico", "Atlántico bacalao C", "Abadejo de atlántico C", "Merluza salvaje", "Pez payaso Atlántico C", "Cirujano salvaje Atlántico", "Atlántico loro C", "Mariposa de atlántico C", "Murena salvaje", "Barracuda Atlántico C", "Pez globo salvaje Atlántico", "Atlántico caballito C", "Medusa de atlántico C", "Calamar salvaje", "Pulpo Atlántico C", "Sepia salvaje Atlántico", "Atlántico nautilo C", "Estrella de atlántico C", "Erizo salvaje", "Cangrejo Atlántico C", "Langosta salvaje Atlántico", "Atlántico bogavante C", "Nécora de atlántico C", "Sardina costera", "Boquerón Atlántico D", "Caballa costera Atlántico", "Atlántico jurel D", "Dorada de atlántico D", "Lubina costera", "Salmonete Atlántico D", "Trucha costera Atlántico", "Atlántico carpa D", "Róbalo de atlántico D", "Atún costera", "Bonito Atlántico D", "Pez espada costera Atlántico", "Atlántico mero D", "Pargo de atlántico D", "Cherna costera", "Raya Atlántico D", "Tiburón costera Atlántico", "Atlántico pez luna D", "Anguila de atlántico D", "Congrio costera", "Rape Atlántico D", "Rodaballo costera Atlántico", "Atlántico lenguado D", "Platija de atlántico D", "Anchoa costera", "Arenque Atlántico D", "Salmón costera Atlántico", "Atlántico bacalao D", "Abadejo de atlántico D", "Merluza costera", "Pez payaso Atlántico D", "Cirujano costera Atlántico", "Atlántico loro D", "Mariposa de atlántico D", "Murena costera", "Barracuda Atlántico D", "Pez globo costera Atlántico", "Atlántico caballito D", "Medusa de atlántico D", "Calamar costera", "Pulpo Atlántico D", "Sepia costera Atlántico", "Atlántico nautilo D", "Estrella de atlántico D", "Erizo costera", "Cangrejo Atlántico D", "Langosta costera Atlántico", "Atlántico bogavante D", "Nécora de atlántico D"];
const FIXED_EVENT_NAMES=["Pez confeti festivo", "Carpa de feria de Bahía", "Gobio luminoso festivo de Bahía", "Bahía: sardina dorada", "Mariposa marina festivo", "Tetra de cristal de Bahía", "Gema nadadora festivo de Bahía", "Bahía: pez prisma", "Cristalino festivo", "Sombra de Bahía", "Ojo abisal festivo de Bahía", "Bahía: serpiente lunar", "Devorador festivo", "Ánima de Bahía", "Espectro festivo de Bahía", "Bahía: fantasma", "Capitán festivo", "Atún migratorio de Bahía", "Cardumen festivo de Bahía", "Bahía: leviatán", "Guardián festivo", "Portal de Bahía", "Eco festivo de Bahía", "Bahía: primordial", "Tamboril festivo", "Payaso de Bahía", "Estrella festivo de Bahía", "Bahía: cuarzo", "Aguamarina festivo", "Diamante de Bahía", "Eclipsoide festivo de Bahía", "Bahía: manto", "Corona festivo", "Susurro de Bahía", "Velo festivo de Bahía", "Bahía: lamento", "Corredor festivo", "Emperador de Bahía", "Grieta festivo de Bahía", "Bahía: semilla", "Koi festivo", "Betta de Bahía", "Disco festivo de Bahía", "Bahía: ángel", "Nebulosa festivo", "Cometa de Bahía", "Aurora festivo de Bahía", "Bahía: relámpago", "Tornado festivo", "Sirena de Bahía", "Pez confeti cristalino de Bahía", "Bahía: carpa de feria", "Gobio luminoso cristalino", "Sardina dorada de Bahía", "Mariposa marina cristalino de Bahía", "Bahía: tetra de cristal", "Gema nadadora cristalino", "Pez prisma de Bahía", "Cristalino cristalino de Bahía", "Bahía: sombra", "Ojo abisal cristalino", "Serpiente lunar de Bahía", "Devorador cristalino de Bahía", "Bahía: ánima", "Espectro cristalino", "Fantasma de Bahía", "Capitán cristalino de Bahía", "Bahía: atún migratorio", "Cardumen cristalino", "Leviatán de Bahía", "Guardián cristalino de Bahía", "Bahía: portal", "Eco cristalino", "Primordial de Bahía", "Tamboril cristalino de Bahía", "Bahía: payaso", "Estrella cristalino", "Cuarzo de Bahía", "Aguamarina cristalino de Bahía", "Bahía: diamante", "Eclipsoide cristalino", "Manto de Bahía", "Corona cristalino de Bahía", "Bahía: susurro", "Velo cristalino", "Lamento de Bahía", "Corredor cristalino de Bahía", "Bahía: emperador", "Grieta cristalino", "Semilla de Bahía", "Koi cristalino de Bahía", "Bahía: betta", "Disco cristalino", "Ángel de Bahía", "Nebulosa cristalino de Bahía", "Bahía: cometa", "Aurora cristalino", "Relámpago de Bahía", "Tornado cristalino de Bahía", "Bahía: sirena", "Pez confeti del eclipse", "Carpa de feria de Bahía del este", "Gobio luminoso del eclipse de Bahía", "Bahía: sardina dorada del este", "Mariposa marina del eclipse", "Tetra de cristal de Bahía del este", "Gema nadadora del eclipse de Bahía", "Bahía: pez prisma del este", "Cristalino del eclipse", "Sombra de Bahía del este", "Ojo abisal del eclipse de Bahía", "Bahía: serpiente lunar del este", "Devorador del eclipse", "Ánima de Bahía del este", "Espectro del eclipse de Bahía", "Bahía: fantasma del este", "Capitán del eclipse", "Atún migratorio de Bahía del este", "Cardumen del eclipse de Bahía", "Bahía: leviatán del este", "Guardián del eclipse", "Portal de Bahía del este", "Eco del eclipse de Bahía", "Bahía: primordial del este", "Tamboril del eclipse", "Payaso de Bahía del este", "Estrella del eclipse de Bahía", "Bahía: cuarzo del este", "Aguamarina del eclipse", "Diamante de Bahía del este", "Eclipsoide del eclipse de Bahía", "Bahía: manto del este", "Corona del eclipse", "Susurro de Bahía del este", "Velo del eclipse de Bahía", "Bahía: lamento del este", "Corredor del eclipse", "Emperador de Bahía del este", "Grieta del eclipse de Bahía", "Bahía: semilla del este", "Koi del eclipse", "Betta de Bahía del este", "Disco del eclipse de Bahía", "Bahía: ángel del este", "Nebulosa del eclipse", "Cometa de Bahía del este", "Aurora del eclipse de Bahía", "Bahía: relámpago del este", "Tornado del eclipse", "Sirena de Bahía del este", "Pez confeti espectral de Bahía", "Bahía: carpa de feria del este", "Gobio luminoso espectral", "Sardina dorada de Bahía del este", "Mariposa marina espectral de Bahía", "Bahía: tetra de cristal del este", "Gema nadadora espectral", "Pez prisma de Bahía del este", "Cristalino espectral de Bahía", "Bahía: sombra del este", "Ojo abisal espectral", "Serpiente lunar de Bahía del este", "Devorador espectral de Bahía", "Bahía: ánima del este", "Espectro espectral", "Fantasma de Bahía del este", "Capitán espectral de Bahía", "Bahía: atún migratorio del este", "Cardumen espectral", "Leviatán de Bahía del este", "Guardián espectral de Bahía", "Bahía: portal del este", "Eco espectral", "Primordial de Bahía del este", "Tamboril espectral de Bahía", "Bahía: payaso del este", "Estrella espectral", "Cuarzo de Bahía del este", "Aguamarina espectral de Bahía", "Bahía: diamante del este", "Eclipsoide espectral", "Manto de Bahía del este", "Corona espectral de Bahía", "Bahía: susurro del este", "Velo espectral", "Lamento de Bahía del este", "Corredor espectral de Bahía", "Bahía: emperador del este", "Grieta espectral", "Semilla de Bahía del este", "Koi espectral de Bahía", "Bahía: betta del este", "Disco espectral", "Ángel de Bahía del este", "Nebulosa espectral de Bahía", "Bahía: cometa del este", "Aurora espectral", "Relámpago de Bahía del este", "Tornado espectral de Bahía", "Bahía: sirena del este", "Pez confeti migratorio", "Carpa de feria de Bahía del oeste", "Gobio luminoso migratorio de Bahía", "Bahía: sardina dorada del oeste", "Mariposa marina migratorio", "Tetra de cristal de Bahía del oeste", "Gema nadadora migratorio de Bahía", "Bahía: pez prisma del oeste", "Cristalino migratorio", "Sombra de Bahía del oeste", "Ojo abisal migratorio de Bahía", "Bahía: serpiente lunar del oeste", "Devorador migratorio", "Ánima de Bahía del oeste", "Espectro migratorio de Bahía", "Bahía: fantasma del oeste", "Capitán migratorio", "Atún migratorio de Bahía del oeste", "Cardumen migratorio de Bahía", "Bahía: leviatán del oeste", "Guardián migratorio", "Portal de Bahía del oeste", "Eco migratorio de Bahía", "Bahía: primordial del oeste", "Tamboril migratorio", "Payaso de Bahía del oeste", "Estrella migratorio de Bahía", "Bahía: cuarzo del oeste", "Aguamarina migratorio", "Diamante de Bahía del oeste", "Eclipsoide migratorio de Bahía", "Bahía: manto del oeste", "Corona migratorio", "Susurro de Bahía del oeste", "Velo migratorio de Bahía", "Bahía: lamento del oeste", "Corredor migratorio", "Emperador de Bahía del oeste", "Grieta migratorio de Bahía", "Bahía: semilla del oeste", "Koi migratorio", "Betta de Bahía del oeste", "Disco migratorio de Bahía", "Bahía: ángel del oeste", "Nebulosa migratorio", "Cometa de Bahía del oeste", "Aurora migratorio de Bahía", "Bahía: relámpago del oeste", "Tornado migratorio", "Sirena de Bahía del oeste", "Pez confeti del umbral de Bahía", "Bahía: carpa de feria del oeste", "Gobio luminoso del umbral", "Sardina dorada de Bahía del oeste", "Mariposa marina del umbral de Bahía", "Bahía: tetra de cristal del oeste", "Gema nadadora del umbral", "Pez prisma de Bahía del oeste", "Cristalino del umbral de Bahía", "Bahía: sombra del oeste", "Ojo abisal del umbral", "Serpiente lunar de Bahía del oeste", "Devorador del umbral de Bahía", "Bahía: ánima del oeste", "Espectro del umbral", "Fantasma de Bahía del oeste", "Capitán del umbral de Bahía", "Bahía: atún migratorio del oeste", "Cardumen del umbral", "Leviatán de Bahía del oeste", "Guardián del umbral de Bahía", "Bahía: portal del oeste", "Eco del umbral", "Primordial de Bahía del oeste", "Tamboril del umbral de Bahía", "Bahía: payaso del oeste", "Estrella del umbral", "Cuarzo de Bahía del oeste", "Aguamarina del umbral de Bahía", "Bahía: diamante del oeste", "Eclipsoide del umbral", "Manto de Bahía del oeste", "Corona del umbral de Bahía", "Bahía: susurro del oeste", "Velo del umbral", "Lamento de Bahía del oeste", "Corredor del umbral de Bahía", "Bahía: emperador del oeste", "Grieta del umbral", "Semilla de Bahía del oeste", "Koi del umbral de Bahía", "Bahía: betta del oeste", "Disco del umbral", "Ángel de Bahía del oeste", "Nebulosa del umbral de Bahía", "Bahía: cometa del oeste", "Aurora del umbral", "Relámpago de Bahía del oeste", "Tornado del umbral de Bahía", "Bahía: sirena del oeste", "Pez confeti dorada", "Carpa de feria de Bahía del norte", "Gobio luminoso dorada de Bahía", "Bahía: sardina dorada del norte", "Mariposa marina dorada", "Tetra de cristal de Bahía del norte", "Gema nadadora dorada de Bahía", "Bahía: pez prisma del norte", "Cristalino dorada", "Sombra de Bahía del norte", "Ojo abisal dorada de Bahía", "Bahía: serpiente lunar del norte", "Devorador dorada", "Ánima de Bahía del norte", "Espectro dorada de Bahía", "Bahía: fantasma del norte", "Capitán dorada", "Atún migratorio de Bahía del norte", "Cardumen dorada de Bahía", "Bahía: leviatán del norte", "Guardián dorada", "Portal de Bahía del norte", "Eco dorada de Bahía", "Bahía: primordial del norte", "Tamboril dorada", "Payaso de Bahía del norte", "Estrella dorada de Bahía", "Bahía: cuarzo del norte", "Aguamarina dorada", "Diamante de Bahía del norte", "Eclipsoide dorada de Bahía", "Bahía: manto del norte", "Corona dorada", "Susurro de Bahía del norte", "Velo dorada de Bahía", "Bahía: lamento del norte", "Corredor dorada", "Emperador de Bahía del norte", "Grieta dorada de Bahía", "Bahía: semilla del norte", "Koi dorada", "Betta de Bahía del norte", "Disco dorada de Bahía", "Bahía: ángel del norte", "Nebulosa dorada", "Cometa de Bahía del norte", "Aurora dorada de Bahía", "Bahía: relámpago del norte", "Tornado dorada", "Sirena de Bahía del norte", "Pez confeti brumoso de Bahía", "Bahía: carpa de feria del norte", "Gobio luminoso brumoso", "Sardina dorada de Bahía del norte", "Mariposa marina brumoso de Bahía", "Bahía: tetra de cristal del norte", "Gema nadadora brumoso", "Pez prisma de Bahía del norte", "Cristalino brumoso de Bahía", "Bahía: sombra del norte", "Ojo abisal brumoso", "Serpiente lunar de Bahía del norte", "Devorador brumoso de Bahía", "Bahía: ánima del norte", "Espectro brumoso", "Fantasma de Bahía del norte", "Capitán brumoso de Bahía", "Bahía: atún migratorio del norte", "Cardumen brumoso", "Leviatán de Bahía del norte", "Guardián brumoso de Bahía", "Bahía: portal del norte", "Eco brumoso", "Primordial de Bahía del norte", "Tamboril brumoso de Bahía", "Bahía: payaso del norte", "Estrella brumoso", "Cuarzo de Bahía del norte", "Aguamarina brumoso de Bahía", "Bahía: diamante del norte", "Eclipsoide brumoso", "Manto de Bahía del norte", "Corona brumoso de Bahía", "Bahía: susurro del norte", "Velo brumoso", "Lamento de Bahía del norte", "Corredor brumoso de Bahía", "Bahía: emperador del norte", "Grieta brumoso", "Semilla de Bahía del norte", "Koi brumoso de Bahía", "Bahía: betta del norte", "Disco brumoso", "Ángel de Bahía del norte", "Nebulosa brumoso de Bahía", "Bahía: cometa del norte", "Aurora brumoso", "Relámpago de Bahía del norte", "Tornado brumoso de Bahía", "Bahía: sirena del norte", "Pez confeti lunar", "Carpa de feria de Bahía del sur", "Gobio luminoso lunar de Bahía", "Bahía: sardina dorada del sur", "Mariposa marina lunar", "Tetra de cristal de Bahía del sur", "Gema nadadora lunar de Bahía", "Bahía: pez prisma del sur", "Cristalino lunar", "Sombra de Bahía del sur", "Ojo abisal lunar de Bahía", "Bahía: serpiente lunar del sur", "Devorador lunar", "Ánima de Bahía del sur", "Espectro lunar de Bahía", "Bahía: fantasma del sur", "Capitán lunar", "Atún migratorio de Bahía del sur", "Cardumen lunar de Bahía", "Bahía: leviatán del sur", "Guardián lunar", "Portal de Bahía del sur", "Eco lunar de Bahía", "Bahía: primordial del sur", "Tamboril lunar", "Payaso de Bahía del sur", "Estrella lunar de Bahía", "Bahía: cuarzo del sur", "Aguamarina lunar", "Diamante de Bahía del sur", "Eclipsoide lunar de Bahía", "Bahía: manto del sur", "Corona lunar", "Susurro de Bahía del sur", "Velo lunar de Bahía", "Bahía: lamento del sur", "Corredor lunar", "Emperador de Bahía del sur", "Grieta lunar de Bahía", "Bahía: semilla del sur", "Koi lunar", "Betta de Bahía del sur", "Disco lunar de Bahía", "Bahía: ángel del sur", "Nebulosa lunar", "Cometa de Bahía del sur", "Aurora lunar de Bahía", "Bahía: relámpago del sur", "Tornado lunar", "Sirena de Bahía del sur", "Pez confeti prismático de Bahía", "Bahía: carpa de feria del sur", "Gobio luminoso prismático", "Sardina dorada de Bahía del sur", "Mariposa marina prismático de Bahía", "Bahía: tetra de cristal del sur", "Gema nadadora prismático", "Pez prisma de Bahía del sur", "Cristalino prismático de Bahía", "Bahía: sombra del sur", "Ojo abisal prismático", "Serpiente lunar de Bahía del sur", "Devorador prismático de Bahía", "Bahía: ánima del sur", "Espectro prismático", "Fantasma de Bahía del sur", "Capitán prismático de Bahía", "Bahía: atún migratorio del sur", "Cardumen prismático", "Leviatán de Bahía del sur", "Guardián prismático de Bahía", "Bahía: portal del sur", "Eco prismático", "Primordial de Bahía del sur", "Tamboril prismático de Bahía", "Bahía: payaso del sur", "Estrella prismático", "Cuarzo de Bahía del sur", "Aguamarina prismático de Bahía", "Bahía: diamante del sur", "Eclipsoide prismático", "Manto de Bahía del sur", "Corona prismático de Bahía", "Bahía: susurro del sur", "Velo prismático", "Lamento de Bahía del sur", "Corredor prismático de Bahía", "Bahía: emperador del sur", "Grieta prismático", "Semilla de Bahía del sur", "Koi prismático de Bahía", "Bahía: betta del sur", "Disco prismático", "Ángel de Bahía del sur", "Nebulosa prismático de Bahía", "Bahía: cometa del sur", "Aurora prismático", "Relámpago de Bahía del sur", "Tornado prismático de Bahía", "Bahía: sirena del sur", "Pez confeti de carnaval", "Carpa de feria de Bahía costero", "Gobio luminoso de carnaval de Bahía", "Bahía: sardina dorada costero", "Mariposa marina de carnaval", "Tetra de cristal de Bahía costero", "Gema nadadora de carnaval de Bahía", "Bahía: pez prisma costero", "Cristalino de carnaval", "Sombra de Bahía costero", "Ojo abisal de carnaval de Bahía", "Bahía: serpiente lunar costero", "Devorador de carnaval", "Ánima de Bahía costero", "Espectro de carnaval de Bahía", "Bahía: fantasma costero", "Capitán de carnaval", "Atún migratorio de Bahía costero", "Cardumen de carnaval de Bahía", "Bahía: leviatán costero", "Guardián de carnaval", "Portal de Bahía costero", "Eco de carnaval de Bahía", "Bahía: primordial costero", "Tamboril de carnaval", "Payaso de Bahía costero", "Estrella de carnaval de Bahía", "Bahía: cuarzo costero", "Aguamarina de carnaval", "Diamante de Bahía costero", "Eclipsoide de carnaval de Bahía", "Bahía: manto costero", "Corona de carnaval", "Susurro de Bahía costero", "Velo de carnaval de Bahía", "Bahía: lamento costero", "Corredor de carnaval", "Emperador de Bahía costero", "Grieta de carnaval de Bahía", "Bahía: semilla costero", "Koi de carnaval", "Betta de Bahía costero", "Disco de carnaval de Bahía", "Bahía: ángel costero", "Nebulosa de carnaval", "Cometa de Bahía costero", "Aurora de carnaval de Bahía", "Bahía: relámpago costero", "Tornado de carnaval", "Sirena de Bahía costero", "Pez confeti abisal de Bahía", "Bahía: carpa de feria costero", "Gobio luminoso abisal", "Sardina dorada de Bahía costero", "Mariposa marina abisal de Bahía", "Bahía: tetra de cristal costero", "Gema nadadora abisal", "Pez prisma de Bahía costero", "Cristalino abisal de Bahía", "Bahía: sombra costero", "Ojo abisal abisal", "Serpiente lunar de Bahía costero", "Devorador abisal de Bahía", "Bahía: ánima costero", "Espectro abisal", "Fantasma de Bahía costero", "Capitán abisal de Bahía", "Bahía: atún migratorio costero", "Cardumen abisal", "Leviatán de Bahía costero", "Guardián abisal de Bahía", "Bahía: portal costero", "Eco abisal", "Primordial de Bahía costero", "Tamboril abisal de Bahía", "Bahía: payaso costero", "Estrella abisal", "Cuarzo de Bahía costero", "Aguamarina abisal de Bahía", "Bahía: diamante costero", "Eclipsoide abisal", "Manto de Bahía costero", "Corona abisal de Bahía", "Bahía: susurro costero", "Velo abisal", "Lamento de Bahía costero", "Corredor abisal de Bahía", "Bahía: emperador costero", "Grieta abisal", "Semilla de Bahía costero", "Koi abisal de Bahía", "Bahía: betta costero", "Disco abisal", "Ángel de Bahía costero", "Nebulosa abisal de Bahía", "Bahía: cometa costero", "Aurora abisal", "Relámpago de Bahía costero", "Tornado abisal de Bahía", "Bahía: sirena costero", "Pez confeti celeste", "Carpa de feria de Bahía oceánico", "Gobio luminoso celeste de Bahía", "Bahía: sardina dorada oceánico", "Mariposa marina celeste", "Tetra de cristal de Bahía oceánico", "Gema nadadora celeste de Bahía", "Bahía: pez prisma oceánico", "Cristalino celeste", "Sombra de Bahía oceánico", "Ojo abisal celeste de Bahía", "Bahía: serpiente lunar oceánico", "Devorador celeste", "Ánima de Bahía oceánico", "Espectro celeste de Bahía", "Bahía: fantasma oceánico", "Capitán celeste", "Atún migratorio de Bahía oceánico", "Cardumen celeste de Bahía", "Bahía: leviatán oceánico", "Guardián celeste", "Portal de Bahía oceánico", "Eco celeste de Bahía", "Bahía: primordial oceánico", "Tamboril celeste", "Payaso de Bahía oceánico", "Estrella celeste de Bahía", "Bahía: cuarzo oceánico", "Aguamarina celeste", "Diamante de Bahía oceánico", "Eclipsoide celeste de Bahía", "Bahía: manto oceánico", "Corona celeste", "Susurro de Bahía oceánico", "Velo celeste de Bahía", "Bahía: lamento oceánico", "Corredor celeste", "Emperador de Bahía oceánico", "Grieta celeste de Bahía", "Bahía: semilla oceánico", "Koi celeste", "Betta de Bahía oceánico", "Disco celeste de Bahía", "Bahía: ángel oceánico", "Nebulosa celeste", "Cometa de Bahía oceánico", "Aurora celeste de Bahía", "Bahía: relámpago oceánico", "Tornado celeste", "Sirena de Bahía oceánico", "Pez confeti rúnico de Bahía", "Bahía: carpa de feria oceánico", "Gobio luminoso rúnico", "Sardina dorada de Bahía oceánico", "Mariposa marina rúnico de Bahía", "Bahía: tetra de cristal oceánico", "Gema nadadora rúnico", "Pez prisma de Bahía oceánico", "Cristalino rúnico de Bahía", "Bahía: sombra oceánico", "Ojo abisal rúnico", "Serpiente lunar de Bahía oceánico", "Devorador rúnico de Bahía", "Bahía: ánima oceánico", "Espectro rúnico", "Fantasma de Bahía oceánico", "Capitán rúnico de Bahía", "Bahía: atún migratorio oceánico", "Cardumen rúnico", "Leviatán de Bahía oceánico", "Guardián rúnico de Bahía", "Bahía: portal oceánico", "Eco rúnico", "Primordial de Bahía oceánico", "Tamboril rúnico de Bahía", "Bahía: payaso oceánico", "Estrella rúnico", "Cuarzo de Bahía oceánico", "Aguamarina rúnico de Bahía", "Bahía: diamante oceánico", "Eclipsoide rúnico", "Manto de Bahía oceánico", "Corona rúnico de Bahía", "Bahía: susurro oceánico", "Velo rúnico", "Lamento de Bahía oceánico", "Corredor rúnico de Bahía", "Bahía: emperador oceánico", "Grieta rúnico", "Semilla de Bahía oceánico", "Koi rúnico de Bahía", "Bahía: betta oceánico", "Disco rúnico", "Ángel de Bahía oceánico", "Nebulosa rúnico de Bahía", "Bahía: cometa oceánico", "Aurora rúnico", "Relámpago de Bahía oceánico", "Tornado rúnico de Bahía", "Bahía: sirena oceánico", "Pez confeti iridiscente", "Carpa de feria de Bahía menor", "Gobio luminoso iridiscente de Bahía", "Bahía: sardina dorada menor", "Mariposa marina iridiscente", "Tetra de cristal de Bahía menor", "Gema nadadora iridiscente de Bahía", "Bahía: pez prisma menor", "Cristalino iridiscente", "Sombra de Bahía menor", "Ojo abisal iridiscente de Bahía", "Bahía: serpiente lunar menor", "Devorador iridiscente", "Ánima de Bahía menor", "Espectro iridiscente de Bahía", "Bahía: fantasma menor", "Capitán iridiscente", "Atún migratorio de Bahía menor", "Cardumen iridiscente de Bahía", "Bahía: leviatán menor", "Guardián iridiscente", "Portal de Bahía menor", "Eco iridiscente de Bahía", "Bahía: primordial menor", "Tamboril iridiscente", "Payaso de Bahía menor", "Estrella iridiscente de Bahía", "Bahía: cuarzo menor", "Aguamarina iridiscente", "Diamante de Bahía menor", "Eclipsoide iridiscente de Bahía", "Bahía: manto menor", "Corona iridiscente", "Susurro de Bahía menor", "Velo iridiscente de Bahía", "Bahía: lamento menor", "Corredor iridiscente", "Emperador de Bahía menor", "Grieta iridiscente de Bahía", "Bahía: semilla menor", "Koi iridiscente", "Betta de Bahía menor", "Disco iridiscente de Bahía", "Bahía: ángel menor", "Nebulosa iridiscente", "Cometa de Bahía menor", "Aurora iridiscente de Bahía", "Bahía: relámpago menor", "Tornado iridiscente", "Sirena de Bahía menor", "Pez confeti sombrío de Bahía", "Bahía: carpa de feria menor", "Gobio luminoso sombrío", "Sardina dorada de Bahía menor", "Mariposa marina sombrío de Bahía", "Bahía: tetra de cristal menor", "Gema nadadora sombrío", "Pez prisma de Bahía menor", "Cristalino sombrío de Bahía", "Bahía: sombra menor", "Ojo abisal sombrío", "Serpiente lunar de Bahía menor", "Devorador sombrío de Bahía", "Bahía: ánima menor", "Espectro sombrío", "Fantasma de Bahía menor", "Capitán sombrío de Bahía", "Bahía: atún migratorio menor", "Cardumen sombrío", "Leviatán de Bahía menor", "Guardián sombrío de Bahía", "Bahía: portal menor", "Eco sombrío", "Primordial de Bahía menor", "Tamboril sombrío de Bahía", "Bahía: payaso menor", "Estrella sombrío", "Cuarzo de Bahía menor", "Aguamarina sombrío de Bahía", "Bahía: diamante menor", "Eclipsoide sombrío", "Manto de Bahía menor", "Corona sombrío de Bahía", "Bahía: susurro menor", "Velo sombrío", "Lamento de Bahía menor", "Corredor sombrío de Bahía", "Bahía: emperador menor", "Grieta sombrío", "Semilla de Bahía menor", "Koi sombrío de Bahía", "Bahía: betta menor", "Disco sombrío", "Ángel de Bahía menor", "Nebulosa sombrío de Bahía", "Bahía: cometa menor", "Aurora sombrío", "Relámpago de Bahía menor", "Tornado sombrío de Bahía", "Bahía: sirena menor"];
const FIXED_TREASURE_NAMES=["Monedas de galeón", "Ancla Atlántico", "Botella de galeón Atlántico", "Brújula de galeón", "Mapa Atlántico", "Farol de galeón Atlántico", "Cofre de galeón", "Estatuilla Atlántico", "Cáliz de galeón Atlántico", "Ídolo de galeón", "Anillo Atlántico", "Relicario de galeón Atlántico", "Corona de galeón", "Tridente Atlántico", "Orbe de galeón Atlántico", "Corazón de galeón", "Lágrima Atlántico", "Cetro de galeón Atlántico", "Medallón de galeón", "Daga Atlántico", "Esfera de galeón Atlántico", "Máscara de galeón", "Astrolabio Atlántico", "Gema de galeón Atlántico", "Campana de galeón", "Timón Atlántico", "Bandera de galeón Atlántico", "Perla de galeón", "Escama Atlántico", "Sello de galeón Atlántico", "Amuleto de galeón", "Collar Atlántico", "Brazalete de galeón Atlántico", "Pendiente de galeón", "Candelabro Atlántico", "Urna de galeón Atlántico", "Fíbula de galeón", "Hebilla Atlántico", "Llave de galeón Atlántico", "Candado de galeón", "Cristal Atlántico", "Fragmento de galeón Atlántico", "Runa de galeón", "Tablilla Atlántico", "Pergamino de galeón Atlántico", "Cuerno de galeón", "Colmillo Atlántico", "Caparazón de galeón Atlántico", "Concha de galeón", "Nudo Atlántico", "Monedas oxidada Atlántico", "Ancla oxidada", "Botella Atlántico", "Brújula oxidada Atlántico", "Mapa oxidada", "Farol Atlántico", "Cofre oxidada Atlántico", "Estatuilla oxidada", "Cáliz Atlántico", "Ídolo oxidada Atlántico", "Anillo oxidada", "Relicario Atlántico", "Corona oxidada Atlántico", "Tridente oxidada", "Orbe Atlántico", "Corazón oxidada Atlántico", "Lágrima oxidada", "Cetro Atlántico", "Medallón oxidada Atlántico", "Daga oxidada", "Esfera Atlántico", "Máscara oxidada Atlántico", "Astrolabio oxidada", "Gema Atlántico", "Campana oxidada Atlántico", "Timón oxidada", "Bandera Atlántico", "Perla oxidada Atlántico", "Escama oxidada", "Sello Atlántico", "Amuleto oxidada Atlántico", "Collar oxidada", "Brazalete Atlántico", "Pendiente oxidada Atlántico", "Candelabro oxidada", "Urna Atlántico", "Fíbula oxidada Atlántico", "Hebilla oxidada", "Llave Atlántico", "Candado oxidada Atlántico", "Cristal oxidada", "Fragmento Atlántico", "Runa oxidada Atlántico", "Tablilla oxidada", "Pergamino Atlántico", "Cuerno oxidada Atlántico", "Colmillo oxidada", "Caparazón Atlántico", "Concha oxidada Atlántico", "Nudo oxidada", "Monedas Atlántico", "Ancla con mensaje Atlántico", "Botella con mensaje", "Brújula Atlántico", "Mapa con mensaje Atlántico", "Farol con mensaje", "Cofre Atlántico", "Estatuilla con mensaje Atlántico", "Cáliz con mensaje", "Ídolo Atlántico", "Anillo con mensaje Atlántico", "Relicario con mensaje", "Corona Atlántico", "Tridente con mensaje Atlántico", "Orbe con mensaje", "Corazón Atlántico", "Lágrima con mensaje Atlántico", "Cetro con mensaje", "Medallón Atlántico", "Daga con mensaje Atlántico", "Esfera con mensaje", "Máscara Atlántico", "Astrolabio con mensaje Atlántico", "Gema con mensaje", "Campana Atlántico", "Timón con mensaje Atlántico", "Bandera con mensaje", "Perla Atlántico", "Escama con mensaje Atlántico", "Sello con mensaje", "Amuleto Atlántico", "Collar con mensaje Atlántico", "Brazalete con mensaje", "Pendiente Atlántico", "Candelabro con mensaje Atlántico", "Urna con mensaje", "Fíbula Atlántico", "Hebilla con mensaje Atlántico", "Llave con mensaje", "Candado Atlántico", "Cristal con mensaje Atlántico", "Fragmento con mensaje", "Runa Atlántico", "Tablilla con mensaje Atlántico", "Pergamino con mensaje", "Cuerno Atlántico", "Colmillo con mensaje Atlántico", "Caparazón con mensaje", "Concha Atlántico", "Nudo con mensaje Atlántico", "Monedas antigua", "Ancla Atlántico del este", "Botella antigua Atlántico", "Brújula antigua", "Mapa Atlántico del este", "Farol antigua Atlántico", "Cofre antigua", "Estatuilla Atlántico del este", "Cáliz antigua Atlántico", "Ídolo antigua", "Anillo Atlántico del este", "Relicario antigua Atlántico", "Corona antigua", "Tridente Atlántico del este", "Orbe antigua Atlántico", "Corazón antigua", "Lágrima Atlántico del este", "Cetro antigua Atlántico", "Medallón antigua", "Daga Atlántico del este", "Esfera antigua Atlántico", "Máscara antigua", "Astrolabio Atlántico del este", "Gema antigua Atlántico", "Campana antigua", "Timón Atlántico del este", "Bandera antigua Atlántico", "Perla antigua", "Escama Atlántico del este", "Sello antigua Atlántico", "Amuleto antigua", "Collar Atlántico del este", "Brazalete antigua Atlántico", "Pendiente antigua", "Candelabro Atlántico del este", "Urna antigua Atlántico", "Fíbula antigua", "Hebilla Atlántico del este", "Llave antigua Atlántico", "Candado antigua", "Cristal Atlántico del este", "Fragmento antigua Atlántico", "Runa antigua", "Tablilla Atlántico del este", "Pergamino antigua Atlántico", "Cuerno antigua", "Colmillo Atlántico del este", "Caparazón antigua Atlántico", "Concha antigua", "Nudo Atlántico del este"];

const fish=[];
for(let i=0;i<1200;i++){
 const bi=i%baseFish.length,b=baseFish[bi], roll=(i*37+Math.floor(i/11)*17+Math.floor(i/67)*31)%100;
 let rarity=roll<55?0:roll<82?1:roll<94?2:roll<98?3:roll<99.7?4:5;
 if(i>=baseFish.length)rarity=Math.max(rarity,Math.min(5,Math.floor(i/220)));
 const name=i<baseFish.length?b[0]:(FIXED_FISH_NAMES[i]||(b[0]+' '+(i+1)));
 const minZ=baseMinZone[bi],zoneBonus=zones[minZ].bonus;
 fish.push({id:i,name,emoji:i<baseFish.length?b[1]:['🐠','🐡','🦈','🐟','🦑','🐙','🐉','💎'][Math.floor(i/19)%8],value:Math.round(b[2]*(1+rarity*.55)*(1+(i%11)*.08)*zoneBonus),rarity,weight:Math.round((.4+((i*13)%80)/10)*10)/10,depth:10+((i*37)%880),speed:.45+((i*19)%20)/10,base:bi,minZone:minZ,});
}
// Event exclusive fish: ~800 variants across all event zones (ids 1200+)
(function buildEventFish(){
 const TARGET=800;
 const emojis=['🎊','🎏','✨','🟡','🦋','💎','💠','🔮','🧊','🌑','👁️','🌙','☀️','👻','🌿','🦴','☠️','🐟','👑','🐉','🌀','🕳️','📡','🌌','🥁','🤡','⭐','🪨','🩵','🦇','💨','🌫️','😭','🏃','🥈','💥','🟣','🌱','🐠','🐡','🦑','🐙','🐋','🐬'];
 for(let i=0;i<TARGET;i++){
  const b=EVENT_FISH[i%EVENT_FISH.length];
  const ez=EVENT_ZONES.find(z=>(z.pool||[]).includes(b[5]))||EVENT_ZONES[i%EVENT_ZONES.length];
  const id=1200+i;
  const roll=(i*41+Math.floor(i/9)*19+Math.floor(i/53)*29)%1000;
  let rarity=roll<500?0:roll<750?1:roll<900?2:roll<970?3:roll<993?4:5;
  if(i<EVENT_FISH.length)rarity=Math.max(rarity,b[4]);
  if(i>=EVENT_FISH.length)rarity=Math.max(rarity,Math.min(5,Math.floor(i/160)));
  const name=i<EVENT_FISH.length?b[0]:(FIXED_EVENT_NAMES[i]||(b[0]+' '+(i+1)));
  const emoji=i<EVENT_FISH.length?b[1]:emojis[i%emojis.length];
  const value=Math.round(b[2]*(1+rarity*.6)*(1+(i%13)*.07)*ez.bonus);
  fish.push({id,name,emoji,value,rarity,weight:Math.round((b[3]+(i%17)*.12)*10)/10,depth:40+((i*29)%500),speed:.55+((i*7)%20)/10,base:1000+(i%EVENT_FISH.length),minZone:ez.unlockAt,zones:[ez.name],event:true,eventKey:b[5],eventZone:ez.id});
 }
})();


const WEATHERS=[
{id:'calm',emoji:'☀️',name:'Mar en calma',desc:'Aguas tranquilas: más peces comunes.',rareMul:.72,commonMul:1.35,priceMul:1,treasureMul:1},
{id:'storm',emoji:'⛈️',name:'Tormenta',desc:'El mar se agita: más rarezas y mejor botín.',rareMul:1.85,commonMul:.55,priceMul:1.22,treasureMul:1.35},
{id:'fog',emoji:'🌫️',name:'Niebla densa',desc:'Visibilidad baja: más especies de profundidad.',rareMul:1.15,commonMul:.9,priceMul:1.08,treasureMul:1.1,depthBoost:true},
{id:'wind',emoji:'🌬️',name:'Viento fuerte',desc:'Corrientes rápidas: peces velociosos más frecuentes.',rareMul:1.1,commonMul:1,priceMul:1.05,treasureMul:1.05,speedBoost:true}
];
const SEASONS=[
{id:'spring',emoji:'🌸',name:'Primavera',desc:'Aguas productivas.',rareMul:1.05,priceMul:1.05},
{id:'summer',emoji:'☀️',name:'Verano',desc:'Abundancia de peces comunes.',rareMul:.92,commonMul:1.2,priceMul:1},
{id:'autumn',emoji:'🍂',name:'Otoño',desc:'Migraciones: más rarezas.',rareMul:1.2,priceMul:1.12},
{id:'winter',emoji:'❄️',name:'Invierno',desc:'Aguas profundas y botín valioso.',rareMul:1.15,priceMul:1.18,depthBoost:true}
];
function weatherIndex(){return (state.day*7+state.zone*3)%WEATHERS.length}
function seasonIndex(){return Math.floor((state.day-1)/7)%SEASONS.length}
function currentWeather(){if(state.isNight)return {id:'night',emoji:'🌙',name:'Noche en el mar',desc:'Rarezas y profundidad aumentadas.',rareMul:1.45,commonMul:.65,priceMul:1.15,treasureMul:1.2,depthBoost:true};return WEATHERS[weatherIndex()]}
function currentSeason(){return SEASONS[seasonIndex()]}
const LIMITED_EVENTS=[
{id:'shark_week',name:'Semana del tiburón',emoji:'🦈',desc:'Tiburones y depredadores más frecuentes. +30 % valor de ventas.',poolBoost:[22,23,24,21],rareMul:1.4,priceMul:1.3,days:7,startMod:0},
{id:'treasure_tide',name:'Marea de tesoros',emoji:'🗝️',desc:'Más hallazgos en naufragios. +50 % tesoros.',poolBoost:[],rareMul:1,priceMul:1.1,treasureMul:1.5,days:5,startMod:11},
{id:'crystal_night',name:'Noche de cristal',emoji:'💎',desc:'Especies luminosas y míticas aumentadas.',poolBoost:[39,55,56,57,58],rareMul:1.55,priceMul:1.25,days:6,startMod:23},
{id:'coast_festival',name:'Festival costero',emoji:'🎉',desc:'Bonus de ventas en zonas iniciales.',poolBoost:[0,1,2,3,4,5],rareMul:.9,priceMul:1.35,days:4,startMod:35},
{id:'abyssal_eclipse',name:'Eclipse abisal',emoji:'🌑',desc:'Criaturas de las profundidades y más míticos.',poolBoost:[29,30,37,38,54,55,56],rareMul:1.7,priceMul:1.4,days:5,startMod:47},
{id:'tuna_migration',name:'Migración del atún',emoji:'🐟',desc:'Atunes y pelágicos en abundancia.',poolBoost:[9,10,12,21,52,53],rareMul:1.25,priceMul:1.2,days:6,startMod:59},
{id:'ghost_fog',name:'Niebla fantasma',emoji:'👻',desc:'Especies espectrales y más tesoros.',poolBoost:[55,48,37,38,29],rareMul:1.45,priceMul:1.15,treasureMul:1.6,days:5,startMod:71},
{id:'secret_gate',name:'Portal secreto',emoji:'🌀',desc:'Puede abrir la Zona Secreta si tienes el logro Explorador.',poolBoost:[57,58,59],rareMul:1.3,priceMul:1.2,days:3,startMod:83,secret:true}
];
function activeEvent(){
 const day=state.day||1;
 for(const ev of LIMITED_EVENTS){
  const cycle=ev.days+10;
  const pos=((day+ev.startMod-1)%cycle);
  if(pos<ev.days)return {...ev,dayLeft:ev.days-pos};
 }
 return null;
}
const ACHIEVEMENTS=[
{id:'first_catch',icon:'🎣',title:'Primera captura',desc:'Pesca tu primer pez.',check:()=>state.totalCaught>=1},
{id:'catch_100',icon:'🐟',title:'Centena',desc:'Pesca 100 peces.',check:()=>state.totalCaught>=100},
{id:'rich',icon:'💰',title:'Bolsa llena',desc:'Acumula 10.000 €.',check:()=>state.money>=10000},
{id:'explorer',icon:'🗺️',title:'Explorador',desc:'Desbloquea 5 zonas.',check:()=> (state.unlocked||[]).length>=5},
{id:'collector',icon:'📖',title:'Coleccionista',desc:'Descubre 50 especies.',check:()=>state.discovered.length>=50},
{id:'mythic',icon:'🐉',title:'Mito vivo',desc:'Descubre un pez mítico.',check:()=>state.discovered.some(id=>fish[id]&&fish[id].rarity>=5)},
{id:'treasure_hunter',icon:'🗝️',title:'Cazatesoros',desc:'Encuentra 5 tesoros.',check:()=>((state.treasures||[]).length+(state.relics||[]).length)>=5},
{id:'captain',icon:'⛵',title:'Capitán',desc:'Compra un barco mejorado.',check:()=>(Number(state.boatSkin)||0)>=1},
{id:'warehouse_pro',icon:'📦',title:'Logística',desc:'Amplía el almacén una vez.',check:()=>(state.warehouseUpgrades||[]).length>=1},
{id:'contract_king',icon:'📋',title:'Contratista',desc:'Completa 10 contratos.',check:()=>(state._contractsDone||0)>=10},
{id:'storm_survivor',icon:'⛈️',title:'Bajo la tormenta',desc:'Pesca durante una tormenta.',check:()=>!!state._caughtInStorm},
{id:'event_goer',icon:'🎉',title:'Fiesta marina',desc:'Juega durante un evento limitado.',check:()=>!!state._playedEvent}
];
function unlockAchievement(id){
 if(!state.achievements)state.achievements=[];
 if(state.achievements.includes(id))return;
 const a=ACHIEVEMENTS.find(x=>x.id===id);if(!a)return;
 state.achievements.push(id);save();
 toast(`🏅 Logro: ${a.title}`);
 showMissionCompleteFx();
}
function checkAchievements(){
 ACHIEVEMENTS.forEach(a=>{try{if(a.check())unlockAchievement(a.id)}catch(e){}});
}
function renderAchievements(){
 const root=$('achievement-list');if(!root)return;
 const got=new Set(state.achievements||[]);
 root.innerHTML=ACHIEVEMENTS.map(a=>{
  const unlocked=got.has(a.id);
  return `<article class="feature-card ${unlocked?'feature-active':''}"><div class="feature-emoji">${unlocked?a.icon:'🔒'}</div><h3>${a.title}</h3><p>${a.desc}</p><small>${unlocked?'Desbloqueado':'Por conseguir'}</small></article>`;
 }).join('');
 const count=got.size;
 if($('achievement-progress'))$('achievement-progress').textContent=`${count} / ${ACHIEVEMENTS.length} logros`;
}
let catchParticles=[];
function spawnCatchParticles(x,y,rarity){
 const cols=['#c9d7e2','#6ee7b7','#60a5fa','#c084fc','#fbbf24','#fb7185'];
 const col=cols[Math.min(5,rarity)]||'#fff';
 for(let i=0;i<12+rarity*3;i++){
  catchParticles.push({x,y,vx:(Math.random()-.5)*4,vy:-1-Math.random()*3,life:.6+Math.random()*.5,col,r:2+Math.random()*3});
 }
}
function showMissionCompleteFx(){
 const el=$('fx-banner');if(!el)return;
 el.classList.remove('hidden');el.classList.add('fx-show');
 clearTimeout(showMissionCompleteFx._t);
 showMissionCompleteFx._t=setTimeout(()=>el.classList.add('hidden'),1600);
}
const TUTORIAL_STEPS=[
{id:0,title:'Bienvenido, capitán',text:'Sal a pescar, llena la bodega y vuelve al puerto.',target:null},
{id:1,title:'Bodega',text:'Abre la Bodega para ver y vender tus capturas, o guardarlas en el almacén.',screen:'hold',highlight:'[data-screen=\"hold\"]'},
{id:2,title:'Almacén',text:'Pulsa «Almacenar» en un pez de la bodega para reservarlo para contratos.',screen:'hold',highlight:'#warehouse-list'},
{id:3,title:'Contratos',text:'En Misiones → Contratos entrega los peces del almacén y cobra la recompensa.',screen:'missions',highlight:'[data-screen=\"missions\"]',tab:'contracts'},
{id:4,title:'¡Listo!',text:'Ya conoces el ciclo: pescar → almacenar → entregar contratos. ¡Buena suerte!',target:null}
];
function renderTutorial(){
 const box=$('tutorial-overlay');if(!box)return;
 if(state.tutorialDone||!state.hasStarted){box.classList.add('hidden');return;}
 const step=TUTORIAL_STEPS[Math.min(state.tutorialStep||0,TUTORIAL_STEPS.length-1)];
 box.classList.remove('hidden');
 $('tutorial-title').textContent=step.title;
 $('tutorial-text').textContent=step.text;
 $('tutorial-step-label').textContent=`Paso ${(state.tutorialStep||0)+1} / ${TUTORIAL_STEPS.length}`;
 document.querySelectorAll('.tutorial-highlight').forEach(el=>el.classList.remove('tutorial-highlight'));
 if(step.highlight){const t=document.querySelector(step.highlight);if(t)t.classList.add('tutorial-highlight')}
}
function advanceTutorial(){
 if(state.tutorialDone)return;
 state.tutorialStep=(state.tutorialStep||0)+1;
 if(state.tutorialStep>=TUTORIAL_STEPS.length){state.tutorialDone=true;state.tutorialStep=TUTORIAL_STEPS.length-1;document.querySelectorAll('.tutorial-highlight').forEach(el=>el.classList.remove('tutorial-highlight'));}
 else {
  const step=TUTORIAL_STEPS[state.tutorialStep];
  if(step.screen){showScreen(step.screen);if(step.tab==='contracts'){missionTab='contracts';}}
 }
 save();renderTutorial();
}
function skipTutorial(){state.tutorialDone=true;save();renderTutorial();document.querySelectorAll('.tutorial-highlight').forEach(el=>el.classList.remove('tutorial-highlight'));}


const CAPTAIN_RANKS=[
{id:'rookie',name:'Grumete',emoji:'⚓',xp:0,color:'#94a3b8'},
{id:'bronze',name:'Capitán bronce',emoji:'🥉',xp:50,color:'#cd7f32'},
{id:'silver',name:'Capitán plata',emoji:'🥈',xp:200,color:'#c0c0c0'},
{id:'gold',name:'Capitán oro',emoji:'🥇',xp:600,color:'#ffd700'},
{id:'platinum',name:'Capitán platino',emoji:'💎',xp:1500,color:'#e5e4e2'}
];
const BOAT_PETS=[
{id:'gull',name:'Gaviota',emoji:'🐦',desc:'+8 % rareza en expediciones',buff:{rare:0.08}},
{id:'crab',name:'Cangrejo',emoji:'🦀',desc:'+10 % valor de venta',buff:{sale:0.10}},
{id:'seal',name:'Foca',emoji:'🦭',desc:'+12 % tesoros',buff:{treasure:0.12}}
];
const GIFT_CODES={CAPITAN2026:{tickets:{fish:10},msg:'¡Código del capitán! +10 fichas de peces'}};
function captainXp(){return state.captainXp||0}
function captainRank(){let r=CAPTAIN_RANKS[0];for(const x of CAPTAIN_RANKS){if(captainXp()>=x.xp)r=x}return r}
function addCaptainXp(n){
 if(!n)return;state.captainXp=(state.captainXp||0)+n;
 const r=captainRank();
 // cosmetics: boat skin unlock flags via rank index
}
function zoneMasteryLevel(z){return (state.zoneMastery&&state.zoneMastery[z])||0}
function zoneMasteryBonus(z){return Math.floor(zoneMasteryLevel(z)/100)*0.05}
function addZoneCatch(z){if(!state.zoneMastery)state.zoneMastery={};state.zoneMastery[z]=(state.zoneMastery[z]||0)+1;const m=state.zoneMastery[z];if(m%100===0)toast(`🏅 Maestría zona ${z+1}: +5 % valor permanente (${m} capturas)`)}
function petBonus(key){const p=BOAT_PETS.find(x=>x.id===state.boatPet);return p&&p.buff&&p.buff[key]||0}
function tryGiftCode(code){
 code=(code||'').trim().toUpperCase();
 if(!code){toast('Escribe un código');return false}
 const g=GIFT_CODES[code];
 if(!g){modal({icon:'❌',eyebrow:'CÓDIGO',title:'Código no válido',desc:'Ese código no existe o está mal escrito. Comprueba las letras y vuelve a intentarlo.',action:'Entendido'});return false}
 if((state.giftCodes||[]).includes(code)){modal({icon:'ℹ️',eyebrow:'CÓDIGO',title:'Ya canjeado',desc:'Este código ya se usó en esta partida.',action:'Entendido'});return false}
 if(!state.giftCodes)state.giftCodes=[];
 state.giftCodes.push(code);
 const got=[];
 const labels={fish:'Fichas de peces',event:'Fichas de evento',treasure:'Fichas de tesoro'};
 if(g.tickets){Object.entries(g.tickets).forEach(([k,v])=>{addTicket(k,v);got.push(['🎟️ '+labels[k]||k,String(v)])})}
 if(g.money){state.money+=g.money;got.push(['💰 Dinero',cash(g.money)])}
 if(g.bait){if(!state.baits)state.baits={};state.baits[g.bait]=(state.baits[g.bait]||0)+(g.baitQty||1);got.push(['🪱 Cebo','×'+(g.baitQty||1)])}
 save();updateTop();renderGacha();renderStats();
 modal({icon:'🎁',eyebrow:'CÓDIGO CANJEADO',title:'¡Regalo recibido!',desc:g.msg||'Has canjeado el código correctamente.',stats:got,action:'¡Genial!'});
 return true;
}
function pushLogbookWeekly(){
 if(!state.logbook)state.logbook=[];
 const week=Math.floor(Date.now()/604800000);
 if(state.logbook.some(e=>e.week===week))return;
 const s=state.stats||{};
 const mv=s.mostValuable?fish[s.mostValuable]:null;
 state.logbook.unshift({week,day:state.day,caught:state.totalCaught||0,sales:state.totalSales||0,best:mv?`${mv.emoji} ${mv.name}`:'—',rank:captainRank().name});
 state.logbook=state.logbook.slice(0,12);
}
function updateRecordsOnCatch(f){
 if(!state.records)state.records={heaviest:null,mostValuable:null,bestBiteStreak:0,currentBiteStreak:0};
 const rec=state.records;
 if(!rec.heaviest||(f.weight||0)>(rec.heaviest.weight||0))rec.heaviest={id:f.id,name:f.name,emoji:f.emoji,weight:f.weight};
 const val=price(f);
 if(!rec.mostValuable||val>(rec.mostValuable.value||0))rec.mostValuable={id:f.id,name:f.name,emoji:f.emoji,value:val};
}


const defaultState=()=>({money:150,day:1,zone:0,unlocked:[0],rod:1,boat:1,storageLevel:1,skillNodes:[],hold:[],discovered:[],sound:true,musicEnabled:true,musicVolume:35,effectsVolume:70,hasStarted:false,totalCaught:0,totalSales:0,boatSkin:0,treasures:[],relics:[],equippedRelics:[],relicStorageLevel:5,relicUpgradeNodes:[],aquarium:[],aquariumLevel:1,aquariumUpgrades:[],completedMissions:[],tournamentClaimed:false,_contractsDone:0,warehouse:[],warehouseUpgrades:[],dailyMissions:[],dailyDate:'',dailyProgress:{},contracts:[],contractsDate:'',achievements:[],tutorialStep:0,tutorialDone:false,zoneCoins:{},baits:{},activeBait:null,isNight:false,nightUsedDay:0,bossHp:{},bossDefeated:[],loginDate:'',loginStreak:0,gachaTickets:{fish:0,event:0,treasure:0},unlockedEventZones:[],captainXp:0,zoneMastery:{},boatPet:null,giftCodes:[],logbook:[],records:{heaviest:null,mostValuable:null,bestBiteStreak:0,currentBiteStreak:0},weeklyMissions:[],weeklyDate:'',weeklyProgress:{},eventFishCaught:[],stats:{playSeconds:0,zoneCatches:{},mostValuable:null,dailyStreak:0,lastDailyDate:'',bitesWon:0,bitesLost:0,gachaOpens:0},sessionStart:0});
let state=loadState(),activeScreen='intro',missionTab='story',timer=30,sessionActive=false,expeditionPausedForSettings=false,expeditionPausedForHold=false,cast=null,castCooldown=0,actors=[],lastFrame=0,raf=0,audioCtx=null,installPrompt=null,bookPage=0,treasureBookPage=0,aquariumPage=0,treasureView='equipment',toastTimeout=null;
const music=$('background-music');
function loadState(){try{const s=JSON.parse(localStorage.getItem('aventuraPesqueraSave'));if(s&&typeof s==='object'){const merged={...defaultState(),...s,unlocked:s.unlocked||[0],hold:s.hold||[],discovered:s.discovered||[],skillNodes:s.skillNodes||[],treasures:s.treasures||[],relics:s.relics||[],equippedRelics:s.equippedRelics||[],relicStorageLevel:5,relicUpgradeNodes:Array.isArray(s.relicUpgradeNodes)?[...new Set(s.relicUpgradeNodes.filter(i=>Number.isInteger(i)&&i>=0&&i<15))].sort((a,b)=>a-b):[],aquarium:s.aquarium||[],aquariumUpgrades:Array.isArray(s.aquariumUpgrades)?s.aquariumUpgrades:[],completedMissions:s.completedMissions||[]};if(!Array.isArray(s.relicUpgradeNodes)&&Number(s.relicStorageLevel)>5)merged.relicUpgradeNodes=Array.from({length:Math.min(15,Math.max(0,Math.floor(Number(s.relicStorageLevel)-5)))},(_,i)=>i);merged.relicStorageLevel=5+merged.relicUpgradeNodes.length;merged.equippedRelics=merged.equippedRelics.slice(0,Math.max(1,Math.min(5,(Number(merged.boatSkin)||0)+1)));merged.aquariumLevel=Math.max(1,Math.min(10,Math.floor(Number(s.aquariumLevel)||Math.min(10,Math.max(1,merged.aquarium.length||1)))));if(!Array.isArray(s.aquariumUpgrades)&&Number(s.aquariumLevel)>1)merged.aquariumUpgrades=Array.from({length:Math.min(30,(Math.min(10,Math.floor(Number(s.aquariumLevel))-1))*3)},(_,i)=>i);merged.aquariumUpgrades=[...new Set(merged.aquariumUpgrades.filter(id=>Number.isInteger(id)&&id>=0&&id<30))].sort((a,b)=>a-b);merged.aquarium=[...new Set(merged.aquarium.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<fish.length))].slice(0,aquariumCapacityFor(merged.aquariumUpgrades));
merged.warehouse=Array.isArray(s.warehouse)?s.warehouse.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<fish.length):[];
merged.warehouseUpgrades=Array.isArray(s.warehouseUpgrades)?[...new Set(s.warehouseUpgrades.filter(id=>Number.isInteger(id)&&id>=0&&id<15))].sort((a,b)=>a-b):[];
merged.warehouse=merged.warehouse.slice(0,warehouseCapacityFor(merged.warehouseUpgrades));
merged.dailyMissions=Array.isArray(s.dailyMissions)?s.dailyMissions:[];
merged.dailyDate=typeof s.dailyDate==='string'?s.dailyDate:'';
merged.dailyProgress=s.dailyProgress&&typeof s.dailyProgress==='object'?s.dailyProgress:{};
merged.contracts=Array.isArray(s.contracts)?s.contracts:[];
merged.contractsDate=typeof s.contractsDate==='string'?s.contractsDate:'';
merged.achievements=Array.isArray(s.achievements)?s.achievements.filter(id=>typeof id==='string'):[];
merged.tutorialStep=Math.max(0,Math.floor(Number(s.tutorialStep)||0));
merged.tutorialDone=Boolean(s.tutorialDone);
return merged}}catch(e){}return defaultState()}
function save(){try{localStorage.setItem('aventuraPesqueraSave',JSON.stringify(state))}catch(e){}}
function exportSave(){try{const payload={app:'Aventura Pesquera',version:1,exportedAt:new Date().toISOString(),save:state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`aventura-pesquera-partida-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Partida exportada correctamente')}catch(e){modal({icon:'⚠️',title:'No se pudo exportar',desc:'Tu navegador no ha podido crear el archivo de la partida.',action:'Entendido'})}}
function importSaveFile(file){if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(String(reader.result||''));const candidate=parsed&&parsed.save?parsed.save:parsed;if(!candidate||typeof candidate!=='object'||Array.isArray(candidate)||!Array.isArray(candidate.hold)||!Array.isArray(candidate.discovered)||!Array.isArray(candidate.unlocked)||!Array.isArray(candidate.skillNodes)||!Number.isFinite(Number(candidate.money))||!Number.isFinite(Number(candidate.day)))throw new Error('invalid save');const clean={...defaultState(),...candidate};clean.money=Math.max(0,Number(clean.money)||0);clean.day=Math.max(1,Math.floor(Number(clean.day)||1));clean.zone=Math.max(0,Math.min(zones.length-1,Math.floor(Number(clean.zone)||0)));clean.unlocked=[...new Set(clean.unlocked.map(Number).filter(n=>Number.isInteger(n)&&n>=0&&n<zones.length))];if(!clean.unlocked.includes(0))clean.unlocked.unshift(0);if(!clean.unlocked.includes(clean.zone))clean.zone=0;clean.treasures=Array.isArray(clean.treasures)?clean.treasures.filter(t=>t&&typeof t.name==='string'&&Number.isFinite(Number(t.value))).map(t=>({...t,value:Math.max(0,Number(t.value)||0)})):[];clean.aquarium=Array.isArray(clean.aquarium)?[...new Set(clean.aquarium.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<fish.length))].slice(0,10):[];clean.aquariumLevel=Math.max(1,Math.min(10,Math.floor(Number(candidate.aquariumLevel)||Math.min(10,Math.max(1,clean.aquarium.length||1)))));clean.aquariumUpgrades=Array.isArray(candidate.aquariumUpgrades)?[...new Set(clean.aquariumUpgrades.filter(id=>Number.isInteger(id)&&id>=0&&id<30))].sort((a,b)=>a-b):Array.from({length:Math.min(30,Math.max(0,Math.min(10,Math.floor(Number(candidate.aquariumLevel)||1)-1)*3))},(_,i)=>i);clean.aquarium=clean.aquarium.slice(0,aquariumCapacityFor(clean.aquariumUpgrades));clean.completedMissions=Array.isArray(clean.completedMissions)?clean.completedMissions.filter(id=>typeof id==='string'&&missionDefs.some(m=>m.id===id)):[];clean._contractsDone=Math.max(0,Math.floor(Number(candidate._contractsDone)||0));clean.boatSkin=Math.max(0,Math.min(4,Math.floor(Number(clean.boatSkin)||0)));clean.tournamentClaimed=Boolean(clean.tournamentClaimed);clean.hold=clean.hold.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<fish.length);clean.discovered=[...new Set(clean.discovered.map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<fish.length))];clean.skillNodes=[...new Set(clean.skillNodes.filter(id=>typeof id==='string'&&SKILLS.some(skill=>skill.id===id)))];clean.sound=Boolean(clean.sound);clean.musicVolume=Math.max(0,Math.min(100,Number(clean.musicVolume)||0));clean.effectsVolume=Math.max(0,Math.min(100,Number(clean.effectsVolume)||0));clean.hasStarted=Boolean(clean.hasStarted);clean.totalCaught=Math.max(0,Number(clean.totalCaught)||0);clean.totalSales=Math.max(0,Number(clean.totalSales)||0);state=clean;save();updateTop();renderMenu();renderZones();renderUpgrades();renderBook();renderHold();renderSettings();syncMusicVolume();toast('Partida importada correctamente');showScreen(state.hasStarted?'menu':'intro')}catch(e){modal({icon:'⚠️',title:'Archivo no válido',desc:'El archivo no parece una partida válida de Aventura Pesquera. No se ha cambiado tu progreso.',action:'Entendido'})}};reader.onerror=()=>modal({icon:'⚠️',title:'Error al leer el archivo',desc:'No se ha podido leer el archivo seleccionado.',action:'Entendido'});reader.readAsText(file)}
async function clearAppCache(){try{if('caches'in window){const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('aventura-pesquera')).map(key=>caches.delete(key)))}}catch(e){}try{if('serviceWorker'in navigator){const registrations=await navigator.serviceWorker.getRegistrations();await Promise.all(registrations.map(registration=>registration.unregister()))}}catch(e){}try{if(location.protocol==='https:'||location.protocol==='http:'){const url=new URL(location.href);url.searchParams.set('refresh',String(Date.now()));location.replace(url.href)}else location.reload()}catch(e){try{location.reload()}catch(_){}}}
function cash(n){return Math.round(n).toLocaleString('es-ES')+' €'}
function hasSkill(id){return (state.skillNodes||[]).includes(id)}
function skillCount(branch){return SKILLS.filter(n=>n.branch===branch&&hasSkill(n.id)).length}
function currentBoat(){return boatTypes[Math.min(boatTypes.length-1,Math.max(0,Number(state.boatSkin)||0))]}
function boatPassive(key){const p=currentBoat().passives||{};return p[key]||0}
function capacity(){return 5+SKILLS.filter(n=>n.branch==='storage'&&n.effect==='capacity'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0)+boatPassive('hold')}
function warehouseOwned(id,owned=state.warehouseUpgrades||[]){return owned.includes(id)}
function warehouseCapacityFor(owned=state.warehouseUpgrades||[]){return Math.min(50,5+owned.reduce((s,id)=>{const amount=id<5?2:id<10?3:4;return s+amount},0))}
function warehouseCapacity(){return warehouseCapacityFor()}
function todayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function msUntilMidnight(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);return m-n}
function formatCountdown(ms){const s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')}
function generateDailyMissions(){
 const seed=todayKey().split('-').reduce((a,b)=>a+Number(b),0)+(state.unlocked.length*17);
 const rng=(n)=>{const x=Math.sin(seed*12.9898+n*78.233)*43758.5453;return x-Math.floor(x)};
 const types=[
  {id:'catch',title:'Capturas del día',desc:n=>`Pesca ${n} peces en total hoy.`,goal:()=>4+Math.floor(rng(1)*6),reward:()=>200+Math.floor(rng(2)*150)+state.unlocked.length*40,track:'sessionCaught'},
  {id:'rare',title:'Rarezas diarias',desc:n=>`Descubre o captura ${n} peces raros o superiores.`,goal:()=>1+Math.floor(rng(3)*2),reward:()=>350+Math.floor(rng(4)*250)+state.unlocked.length*60,track:'rareCaught'},
  {id:'earn',title:'Ingresos del puerto',desc:n=>`Gana ${cash(n)} vendiendo capturas.`,goal:()=>150+Math.floor(rng(5)*200)+state.unlocked.length*80,reward:()=>180+Math.floor(rng(6)*120)+state.unlocked.length*35,track:'soldValue'},
  {id:'zone',title:'Explorador diario',desc:()=>`Completa una expedición en ${zones[state.unlocked[Math.floor(rng(7)*state.unlocked.length)]||0].name}.`,goal:()=>1,reward:()=>220+state.unlocked.length*50,track:'zoneTrip'}
 ];
 const picks=[];const used=new Set();
 for(let i=0;i<3;i++){let ti=Math.floor(rng(10+i)*types.length);while(used.has(ti))ti=(ti+1)%types.length;used.add(ti);const t=types[ti];const goal=t.goal();picks.push({id:t.id+'-'+todayKey()+'-'+i,type:t.id,title:t.title,desc:typeof t.desc==='function'?t.desc(goal):t.desc,goal,reward:t.reward(),track:t.track,progress:0,claimed:false})}
 return picks;
}
function generateContracts(excludeBases=[],seedExtra=0){
 const unlockedZones=(state.unlocked||[0]).filter(z=>z>=0&&z<zones.length);
 const candidates=[];
 unlockedZones.forEach(zi=>{zones[zi].pool.forEach(bi=>{if(bi>=0&&bi<baseFish.length)candidates.push({base:bi,zone:zi})})});
 if(!candidates.length)return [];
 const seed=todayKey().split('-').reduce((a,b)=>a+Number(b),0)+99+(state._contractsDone||0)*17+seedExtra;
 const rng=(n)=>{const x=Math.sin(seed*19.19+n*47.47)*43758.5453;return x-Math.floor(x)};
 const contracts=[];const usedBases=new Set(excludeBases);
 for(let i=0;i<3;i++){
  let pick=candidates[Math.floor(rng(20+i)*candidates.length)];
  let tries=0;while(usedBases.has(pick.base)&&tries<40){pick=candidates[Math.floor(rng(30+i+tries)*candidates.length)];tries++}
  usedBases.add(pick.base);
  const b=baseFish[pick.base];
  const qty=1+Math.floor(rng(40+i)*3);
  const zoneBonus=zones[pick.zone].bonus||1;
  const reward=Math.round((b[2]*qty*zoneBonus)*(2.2+rng(50+i)*1.8)+80*qty);
  contracts.push({id:'c-'+Date.now()+'-'+i+'-'+Math.random().toString(36).slice(2,7),base:pick.base,name:b[0],emoji:b[1],qty,zone:pick.zone,zoneName:zones[pick.zone].name,reward,claimed:false});
 }
 return contracts;
}
function generateOneContract(excludeBases=[]){
 const batch=generateContracts(excludeBases,Math.floor(Math.random()*9999)+1);
 return batch[0]||null;
}

function weekKey(){const d=new Date();const onejan=new Date(d.getFullYear(),0,1);const week=Math.ceil((((d-onejan)/86400000)+onejan.getDay()+1)/7);return d.getFullYear()+'-W'+week}
function generateWeeklyMissions(){
 return [
  {id:'w-boss',title:'Cazador de jefes',desc:'Derrota 3 jefes de zona (día o noche).',goal:3,reward:5000,track:'bossKills',progress:0,claimed:false},
  {id:'w-gacha',title:'Afortunado del muelle',desc:'Abre 5 máquinas gachapón.',goal:5,reward:3500,track:'gachaOpens',progress:0,claimed:false},
  {id:'w-hits',title:'Combate naval',desc:'Asesta 10 golpes a jefes.',goal:10,reward:4000,track:'bossHits',progress:0,claimed:false},
  {id:'w-night',title:'Lobo de mar',desc:'Completa 3 pescas nocturnas.',goal:3,reward:3000,track:'nightTrips',progress:0,claimed:false}
 ];
}
function ensureWeeklyContent(){
 const key=weekKey();
 if(state.weeklyDate!==key){state.weeklyDate=key;state.weeklyMissions=generateWeeklyMissions();state.weeklyProgress={};save()}
 if(!Array.isArray(state.weeklyMissions)||!state.weeklyMissions.length){state.weeklyMissions=generateWeeklyMissions();save()}
}
function trackWeekly(track,amount=1){
 ensureWeeklyContent();
 if(!state.weeklyProgress)state.weeklyProgress={};
 state.weeklyProgress[track]=(state.weeklyProgress[track]||0)+amount;
 (state.weeklyMissions||[]).forEach(m=>{if(m.track===track&&!m.claimed)m.progress=Math.min(m.goal,state.weeklyProgress[track]||0)});
 save();
}
function claimWeeklyMission(id){
 ensureWeeklyContent();
 const m=(state.weeklyMissions||[]).find(x=>x.id===id);if(!m||m.claimed)return;
 if((m.progress||0)<m.goal)return;
 m.claimed=true;state.money+=m.reward;addCaptainXp(8);addTicket('fish',2);addTicket('event',1);addTicket('treasure',1);save();updateTop();renderMissions();renderGacha();showMissionCompleteFx();toast(`Semanal: +${cash(m.reward)} · 🎟️ fichas`);
}
function maybeDailyLogin(){
 const key=todayKey();
 if(state.loginDate===key)return;
 const prev=state.loginDate;
 let streak=state.loginStreak||0;
 if(prev){
  const p=new Date(prev+'T12:00:00'),n=new Date(key+'T12:00:00');
  const diff=Math.round((n-p)/86400000);
  streak=diff===1?Math.min(7,streak+1):1;
 } else streak=1;
 state.loginStreak=streak;
 state.loginDate=key;
 const day=streak; // 1..7
 const rewards=[];
 const money=50*day+day*day*15;
 state.money+=money;rewards.push(`💰 ${cash(money)}`);
 addTicket('fish',day>=3?2:1);rewards.push(`🎟️ Ficha pez ×${day>=3?2:1}`);
 if(day>=2){addTicket('treasure',1);rewards.push('🎟️ Ficha tesoro')}
 if(day>=4){addTicket('event',1);rewards.push('🎟️ Ficha evento')}
 if(day>=5){const b=BAITS[Math.min(BAITS.length-1,day-2)];if(!state.baits)state.baits={};state.baits[b.id]=(state.baits[b.id]||0)+1;rewards.push(`${b.emoji} ${b.name}`)}
 if(day>=7){addTicket('fish',3);addTicket('event',2);addTicket('treasure',2);rewards.push('🎁 Bonus día 7: +3/+2/+2 fichas');state.loginStreak=0}
 save();updateTop();renderGacha();
 setTimeout(()=>modal({icon:'🎁',eyebrow:'RACHA DE LOGIN',title:`Día ${day} de 7`,desc:rewards.join('\n'),stats:[['Racha',`${day}/7`]],action:'¡Genial!'}),400);
}

function ensureDailyContent(){
 const key=todayKey();
 if(state.dailyDate!==key){const prev=state.dailyDate;state.dailyDate=key;state.dailyMissions=generateDailyMissions();state.dailyProgress={sessionCaught:0,rareCaught:0,soldValue:0,zoneTrip:0};if(!state.stats)state.stats={};if(prev){const p=new Date(prev+'T12:00:00'),n=new Date(key+'T12:00:00');const diff=Math.round((n-p)/86400000);state.stats.dailyStreak=diff===1?(state.stats.dailyStreak||0)+1:1}else state.stats.dailyStreak=1;save()}
 if(!Array.isArray(state.dailyMissions)||!state.dailyMissions.length){state.dailyMissions=generateDailyMissions();save()}
 if(!Array.isArray(state.contracts))state.contracts=[];
 state.contracts=state.contracts.filter(c=>c&&!c.claimed);
 while(state.contracts.length<3){
  const next=generateOneContract(state.contracts.map(c=>c.base));
  if(!next)break;
  state.contracts.push(next);
 }
 if(state.contracts.length>3)state.contracts=state.contracts.slice(0,3);
}
function trackDaily(track,amount=1){ensureDailyContent();if(!state.dailyProgress)state.dailyProgress={};state.dailyProgress[track]=(state.dailyProgress[track]||0)+amount;state.dailyMissions.forEach(m=>{if(m.track===track&&!m.claimed)m.progress=Math.min(m.goal,state.dailyProgress[track]||0)});save()}
function warehouseCountByBase(baseId){return (state.warehouse||[]).filter(id=>fish[id]&&fish[id].base===baseId).length}
function deliverContract(contractId){
 ensureDailyContent();
 const c=(state.contracts||[]).find(x=>x.id===contractId);if(!c||c.claimed)return;
 const have=warehouseCountByBase(c.base);if(have<c.qty){toast(`Necesitas ${c.qty} ${c.name} en el almacén (tienes ${have})`);return}
 let left=c.qty;const next=[];
 for(const id of state.warehouse){if(left>0&&fish[id]&&fish[id].base===c.base){left--;continue}next.push(id)}
 state.warehouse=next;c.claimed=true;state.money+=c.reward;state.totalSales+=c.reward;state._contractsDone=(state._contractsDone||0)+1;addCaptainXp(3);addTicket('fish',1);if(Math.random()<0.35)addTicket('treasure',1);if(unlockedEventZoneIds().length&&Math.random()<0.25)addTicket('event',1);toast('🎟️ +1 ficha de contrato');
 state.contracts=(state.contracts||[]).filter(x=>x.id!==c.id);
 const replacement=generateOneContract(state.contracts.map(x=>x.base));
 if(replacement)state.contracts.push(replacement);
 while(state.contracts.length<3){const n=generateOneContract(state.contracts.map(x=>x.base));if(!n)break;state.contracts.push(n)}
 save();updateTop();renderHold();renderMissions();sound('sell');toast(`Contrato entregado: +${cash(c.reward)} · Nuevo contrato disponible`);showMissionCompleteFx();checkAchievements();
}
function storeToWarehouse(holdIndex){
 if(holdIndex<0||holdIndex>=state.hold.length)return;
 if((state.warehouse||[]).length>=warehouseCapacity()){toast('Almacén lleno. Mejora el árbol Almacén.');return}
 const id=state.hold.splice(holdIndex,1)[0];
 if(!state.warehouse)state.warehouse=[];
 state.warehouse.push(id);save();renderHold();sound('click');toast(`${fish[id].name} guardado en el almacén`);
}
function unstoreFromWarehouse(whIndex){
 if(whIndex<0||whIndex>=(state.warehouse||[]).length)return;
 if(state.hold.length>=capacity()){toast('Bodega llena.');return}
 const id=state.warehouse.splice(whIndex,1)[0];
 state.hold.push(id);save();renderHold();sound('click');toast(`${fish[id].name} devuelto a la bodega`);
}
function sellWarehouseIndex(i){
 if(i<0||i>=(state.warehouse||[]).length)return;
 const id=state.warehouse.splice(i,1)[0],value=price(fish[id]);
 state.money+=value;state.totalSales+=value;trackDaily('soldValue',value);sound('sell');save();updateTop();renderHold();toast(`Vendido por ${cash(value)}`);
}
function rodRange(){return 105+(state.rod-1)*42+skillCount('rod')*18}
function boatSpeed(){const bonus=SKILLS.filter(n=>n.branch==='boat'&&n.effect==='speed'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0);return .38*(1+bonus+relicBonus('speed'))}
function fishValueMultiplier(f){let mult=1+SKILLS.filter(n=>n.branch==='storage'&&n.effect==='premium'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0);if(f&&f.rarity>=2)mult+=SKILLS.filter(n=>n.branch==='storage'&&n.effect==='rarevalue'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0);return mult}
function currentZone(){return zones[state.zone]}
function discoveredSet(){return new Set(state.discovered)}
function price(f){const w=currentWeather(),s=currentSeason(),ev=activeEvent();let mul=(1+(state.rod-1)*.025)*fishValueMultiplier(f)*(1+relicBonus('sale')+petBonus('sale'))*(1+zoneMasteryBonus(state.zone||0))*(w.priceMul||1)*(s.priceMul||1)*(ev&&ev.priceMul||1);let v=f.value*mul;const mz=Math.max(f.minZone||0,0);const gap=Math.max(0,mz-state.zone);if(gap>0)v*=Math.pow(0.5,gap);const r=f.rarity||0;const z=state.zone||0;if(z<=0){if(r>=4)v*=0.22;else if(r>=3)v*=0.32;else if(r>=2)v*=0.48;else if(r>=1)v*=0.72}else if(z===1){if(r>=4)v*=0.35;else if(r>=3)v*=0.5;else if(r>=2)v*=0.7}else if(z===2){if(r>=4)v*=0.55;else if(r>=3)v*=0.75}else if(z===3){if(r>=5)v*=0.7;else if(r>=4)v*=0.85}return Math.max(1,Math.round(v))}
let musicReady=false,musicStarting=false;
function syncMusicVolume(){
 if(!music)return;
 const enabled=state.musicEnabled!==false;
 const vol=Math.max(0,Math.min(1,(Number(state.musicVolume)||0)/100));
 music.volume=enabled?vol:0;
 if(!enabled){try{music.pause()}catch(e){}}
}
function startMusic(){
 if(!music||state.musicEnabled===false)return;
 if(musicStarting)return;
 syncMusicVolume();
 try{
  if(!music.getAttribute('src')&&!music.src)music.src='./audio/AventuraPesquera.mp3';
  if(!music.paused&&!music.ended){musicReady=true;return}
  musicStarting=true;
  const attempt=music.play();
  if(attempt&&typeof attempt.then==='function'){
   attempt.then(()=>{musicReady=true;musicStarting=false;const n=$('music-status');if(n)n.textContent=''}).catch(()=>{musicStarting=false;const n=$('music-status');if(n)n.textContent='Música bloqueada: toca la pantalla o actívala en Ajustes.'});
  } else {musicStarting=false;musicReady=true}
 }catch(e){musicStarting=false;const n=$('music-status');if(n)n.textContent='Música no disponible en este dispositivo.'}
}
function stopMusic(){if(!music)return;try{music.pause()}catch(e){}}
if(typeof document!=='undefined'){
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&state.musicEnabled!==false&&music&&music.paused)startMusic()});
}
function sound(type='click'){if(!state.sound||Number(state.effectsVolume)<=0)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const seq=type==='catch'?[520,680,850]:type==='catch1'?[480,620]:type==='catch2'?[520,700,880]:type==='catch3'?[400,600,900,1100]:type==='catch4'?[500,750,1000,1250]:type==='catch5'?[300,500,800,1200,1500]:type==='sell'?[560,780]:type==='cast'?[300,470]:type==='upgrade'?[430,620,790]:[430];seq.forEach((hz,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type==='cast'?'triangle':'sine';o.frequency.value=hz;const volume=.035*(Math.max(0,Math.min(100,Number(state.effectsVolume)||0))/100);g.gain.setValueAtTime(volume,audioCtx.currentTime+i*.09);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+i*.09+.12);o.connect(g);g.connect(audioCtx.destination);o.start(audioCtx.currentTime+i*.09);o.stop(audioCtx.currentTime+i*.09+.13)})}catch(e){}}
function showScreen(name){if(sessionActive&&name!=='fishing'&&name!=='settings')return;activeScreen=name;screens.forEach(s=>$(s).classList.toggle('hidden',s!==name));window.scrollTo({top:0,behavior:'smooth'});if(name==='menu')renderMenu();if(name==='zones')renderZones();if(name==='upgrades')renderUpgrades();if(name==='encyclopedia')renderBook();if(name==='hold')renderHold();if(name==='settings')renderSettings();if(name==='boat')renderBoat();if(name==='treasures')renderTreasures();if(name==='aquarium')renderAquarium();if(name==='missions')renderMissions();if(name==='achievements')renderAchievements();if(name==='gacha')renderGacha();if(name==='stats')renderStats();if(name==='baits')renderBaitShop();renderTutorial();save()}
function openSettings(){if(activeScreen==='fishing'&&sessionActive){sessionActive=false;expeditionPausedForSettings=true;keys.left=false;keys.right=false;lastFrame=0}sound('click');showScreen('settings')}
function returnFromSettings(){if(expeditionPausedForSettings){expeditionPausedForSettings=false;showScreen('fishing');sessionActive=true;lastFrame=0;startLoop();return}showScreen('menu')}
function updateTop(){ $('money').textContent=cash(state.money);$('day').textContent='Día '+state.day;$('menu-day').textContent=state.day;$('encyclopedia-progress').textContent=state.discovered.length.toLocaleString('es-ES')+' / 1.200 descubiertos';$('hold-summary').textContent=state.hold.length+' peces almacenados';updateExpeditionHoldCounter()}
function updateExpeditionHoldCounter(){const count=state.hold.length,cap=capacity();if($('expedition-hold-count'))$('expedition-hold-count').textContent=`${count} / ${cap}`;if($('expedition-hold-capacity'))$('expedition-hold-capacity').textContent=`${count} / ${cap}`;if($('expedition-hold-free'))$('expedition-hold-free').textContent=String(Math.max(0,cap-count))}
function renderMenu(){updateTop();$('current-zone-title').textContent=currentZone().name;$('current-zone-desc').textContent=currentZone().desc;dailyWorld();const ng=$('go-night');if(ng){const nightUnlocked=(state.unlocked||[]).some(z=>z>=3);const used=(state.nightUsedDay||0)===state.day;if(!nightUnlocked){ng.disabled=true;ng.textContent='🌙 Nocturna (zona 4+)';}else{ng.disabled=used;ng.textContent=used?'🌙 Nocturna usada hoy':'🌙 Pesca nocturna';}}const ach=$('menu-achievements-count');if(ach)ach.textContent=`${(state.achievements||[]).length}/${ACHIEVEMENTS.length}`;renderTutorial();}
function renderZones(){
 ensureEventZones();
 const tab=window._zoneTab||'normal';
 document.querySelectorAll('[data-zone-tab]').forEach(b=>b.classList.toggle('active',b.dataset.zoneTab===tab));
 const grid=$('zone-grid');if(!grid)return;
 if(tab==='event'){
  const maxZ=Math.max(0,...(state.unlocked||[0]));
  grid.innerHTML=EVENT_ZONES.map(z=>{
   const open=maxZ>=z.unlockAt||(state.unlockedEventZones||[]).includes(z.id);
   return `<button class="zone-card ${open?'':'quality-locked'}" disabled>
    <span class="zone-art" style="background:linear-gradient(145deg,${z.color[0]},${z.color[1]})">${open?z.emoji:'🔒'}</span>
    <span class="zone-info"><b>${z.name}</b><p>${z.desc}</p>
    <small>${open?'Desbloqueada · peces de evento en gacha':'Se abre al llegar a la zona '+(z.unlockAt+1)}</small></span>
    <span class="zone-price">${open?'EVENTO':'ZONA '+ (z.unlockAt+1)}</span></button>`;
  }).join('');
  return;
 }
 grid.innerHTML=zones.map((z,i)=>{
  if(z.secret&&!state.unlocked.includes(i))return `<button class="zone-card" disabled><span class="zone-art" style="background:linear-gradient(145deg,#1a0a2e,#4c1d95)">🔒</span><span class="zone-info"><b>Zona Secreta</b><p>Requiere logro Explorador y evento Portal secreto.</p></span><span class="zone-price">BLOQUEADA</span></button>`;
  let unlocked=state.unlocked.includes(i),current=i===state.zone;
  const dayBoss=ZONE_BOSSES.find(b=>b.zone===i&&!b.night);
  const nightBoss=ZONE_BOSSES.find(b=>b.zone===i&&b.night);
  let bossHtml='';
  if(unlocked&&dayBoss&&nightBoss){
   const dKey='d'+i,nKey='n'+i;
   const dDef=(state.bossDefeated||[]).includes(dKey);
   const nDef=(state.bossDefeated||[]).includes(nKey);
   const dHp=dDef?0:(state.bossHp?.[dKey]??dayBoss.hp);
   const nHp=nDef?0:(state.bossHp?.[nKey]??nightBoss.hp);
   bossHtml=`<small class="boss-progress">⚔️ Día: ${dDef?'✅':(dayBoss.hp-dHp)+'/'+dayBoss.hp} · 🌙 Noche: ${nDef?'✅':(nightBoss.hp-nHp)+'/'+nightBoss.hp}</small>`;
  }
  return `<button class="zone-card ${current?'current':''}" data-zone="${i}" ${!unlocked&&state.money<z.price?'disabled':''}><span class="zone-art" style="background:linear-gradient(145deg,${z.color[0]},${z.color[1]})">${z.emoji}</span><span class="zone-info"><b>${z.name}</b><p>${z.desc}</p><small>◉ ${z.depth} · ${z.pool.length} especies base</small>${bossHtml}</span><span class="zone-price">${current?'ACTUAL':unlocked?'DESBLOQUEADA':cash(z.price)}</span>${!unlocked?'<span class="zone-lock">🔒</span>':''}</button>`;
 }).join('');
}

const SKILLS=[
{id:'b1',branch:'boat',icon:'🐟',name:'Radar de cardúmenes',desc:'+2 peces nadando por expedición.',cost:250,effect:'spawn',amount:2,req:null},
{id:'b2',branch:'boat',icon:'💨',name:'Motor afinado',desc:'El barco se desplaza un 25 % más rápido.',cost:700,effect:'speed',amount:.25,req:'b1'},
{id:'b3',branch:'boat',icon:'🧭',name:'Navegación precisa',desc:'Mejora la colocación de los cardúmenes.',cost:1800,effect:'spawn',amount:1,req:'b2'},
{id:'b4',branch:'boat',icon:'🌊',name:'Sonda de profundidad',desc:'La línea desciende más deprisa.',cost:4800,effect:'depth',amount:1,req:'b3'},
{id:'b5',branch:'boat',icon:'🐠',name:'Zona de alimentación',desc:'+3 peces activos por expedición.',cost:12000,effect:'spawn',amount:3,req:'b4'},
{id:'b6',branch:'boat',icon:'⚓',name:'Estabilizadores',desc:'Aumenta el margen de contacto con los peces.',cost:30000,effect:'radius',amount:1,req:'b5'},
{id:'b7',branch:'boat',icon:'🚤',name:'Casco oceanográfico',desc:'+4 peces y más velocidad.',cost:85000,effect:'spawn',amount:4,req:'b6'},
{id:'r1',branch:'rod',icon:'🪝',name:'Anzuelo fino',desc:'Mejora la posibilidad de encontrar rarezas.',cost:300,effect:'rare',amount:.06,req:null},
{id:'r2',branch:'rod',icon:'🧵',name:'Hilo reforzado',desc:'Aumenta el alcance de la caña.',cost:850,effect:'range',amount:25,req:'r1'},
{id:'r3',branch:'rod',icon:'✨',name:'Cebo iridiscente',desc:'Mejora la probabilidad de peces épicos.',cost:2400,effect:'rare',amount:.08,req:'r2'},
{id:'r4',branch:'rod',icon:'🧪',name:'Cebo especializado',desc:'Aumenta la calidad de los encuentros.',cost:6500,effect:'rare',amount:.10,req:'r3'},
{id:'r5',branch:'rod',icon:'🎯',name:'Lanzamiento de precisión',desc:'Amplía ligeramente el margen de captura.',cost:16000,effect:'range',amount:18,req:'r4'},
{id:'r6',branch:'rod',icon:'💎',name:'Señuelo abisal',desc:'Mejora las probabilidades de legendarios.',cost:42000,effect:'rare',amount:.16,req:'r5'},
{id:'r7',branch:'rod',icon:'👑',name:'Maestría legendaria',desc:'Aumenta aún más la posibilidad de rarezas altas.',cost:115000,effect:'rare',amount:.20,req:'r6'},
{id:'s1',branch:'storage',icon:'📦',name:'Compartimento extra',desc:'+2 espacios de bodega.',cost:280,effect:'capacity',amount:2,req:null},
{id:'s2',branch:'storage',icon:'🧊',name:'Conservación en frío',desc:'Todos los peces valen un 12 % más.',cost:800,effect:'premium',amount:.12,req:'s1'},
{id:'s3',branch:'storage',icon:'🧺',name:'Red de carga',desc:'+3 espacios de bodega.',cost:2200,effect:'capacity',amount:3,req:'s2'},
{id:'s4',branch:'storage',icon:'🏷️',name:'Clasificación de calidad',desc:'Los compradores pagan un 18 % adicional.',cost:6000,effect:'premium',amount:.18,req:'s3'},
{id:'s5',branch:'storage',icon:'🪙',name:'Mercado de coleccionistas',desc:'Peces raros y superiores valen más.',cost:15500,effect:'rarevalue',amount:.25,req:'s4'},
{id:'s6',branch:'storage',icon:'🚛',name:'Bodega de expedición',desc:'+5 espacios de bodega.',cost:40000,effect:'capacity',amount:5,req:'s5'},
{id:'s7',branch:'storage',icon:'💰',name:'Contrato del acuario',desc:'Todos los peces se venden un 35 % más caros.',cost:105000,effect:'premium',amount:.35,req:'s6'}
];
const skillBranches={
boat:{icon:'🚤',title:'Barco',desc:'Exploración, velocidad y cantidad de peces.',names:[['🌬️','Hélice de bronce','Velocidad +8 %.','speed',.08],['🐟','Radar costero','+1 pez por expedición.','spawn',1],['🛟','Casco reforzado','Margen de captura mejorado.','radius',1],['🌊','Motor de doble eje','Velocidad +10 %.','speed',.10],['🐠','Atracción de cardúmenes','+2 peces por expedición.','spawn',2],['🧭','Cartografía marina','Velocidad +7 %.','speed',.07],['⚙️','Turbina avanzada','Velocidad +12 %.','speed',.12],['🫧','Sonda de ecos','+2 peces por expedición.','spawn',2],['🚢','Casco de acero','Velocidad +10 %.','speed',.10],['🪸','Ruta de arrecifes','+2 peces por expedición.','spawn',2]]},
rod:{icon:'🎣',title:'Caña',desc:'Rareza, alcance y capturas extraordinarias.',names:[['🪝','Anzuelo de titanio','Probabilidad de rarezas +5 %.','rare',.05],['🧵','Línea trenzada','Alcance +15.','range',15],['✨','Señuelo brillante','Probabilidad de rarezas +6 %.','rare',.06],['🎯','Lanzamiento largo','Alcance +20.','range',20],['🧪','Cebo de profundidad','Probabilidad de rarezas +7 %.','rare',.07],['💠','Nudo profesional','Alcance +18.','range',18],['🌟','Señuelo espectral','Probabilidad de rarezas +8 %.','rare',.08],['🪶','Flotador de precisión','Alcance +20.','range',20],['🦑','Cebo de calamar','Probabilidad de rarezas +9 %.','rare',.09],['👑','Instinto de pescador','Probabilidad de rarezas +10 %.','rare',.10]]},
storage:{icon:'🧺',title:'Bodega',desc:'Capacidad, conservación y valor de venta.',names:[['📦','Cajón impermeable','+2 espacios de bodega.','capacity',2],['🧊','Hielo industrial','Valor de venta +8 %.','premium',.08],['🧺','Red de gran capacidad','+3 espacios de bodega.','capacity',3],['🏷️','Etiquetado premium','Valor de venta +9 %.','premium',.09],['🪙','Subasta local','Peces raros valen un 10 % más.','rarevalue',.10],['🚚','Bodega modular','+4 espacios de bodega.','capacity',4],['💎','Certificado de calidad','Valor de venta +10 %.','premium',.10],['📦','Estiba optimizada','+4 espacios de bodega.','capacity',4],['🤝','Acuerdos con restaurantes','Valor de venta +12 %.','premium',.12],['💰','Red de coleccionistas','Peces raros valen un 15 % más.','rarevalue',.15]]},
time:{icon:'⏱️',title:'Tiempo',desc:'Alarga las expediciones de 30 hasta 60 segundos.',names:[['⌛','Un minuto más cerca','Expedición +3 segundos.','time',3]]}
};
// Expand the original seven nodes into long, connected progression trees.
for(const branch of ['boat','rod','storage']){
 const existing=SKILLS.filter(n=>n.branch===branch);let previous=existing[existing.length-1].id;
 for(let level=8;level<=30;level++){
  const t=skillBranches[branch].names[(level-8)%skillBranches[branch].names.length];const id=({boat:'b',rod:'r',storage:'s'})[branch]+level;
  const base=existing[existing.length-1].cost;const cost=Math.round(base*Math.pow(1.48,level-7));
  SKILLS.push({id,branch,icon:t[0],name:t[1]+' '+(Math.floor((level-1)/10)+1),desc:t[2],cost,effect:t[3],amount:t[4],req:previous});previous=id;
 }
}
let previousTime=null;
for(let level=1;level<=10;level++){
 const id='t'+level,cost=Math.round(1800*Math.pow(2.05,level-1));
 SKILLS.push({id,branch:'time',icon:level===10?'⏱️':'⌛',name:level===10?'Expedición maestra':'Ampliación de jornada '+level,desc:`Aumenta la duración de cada expedición en 3 segundos (${30+level*3} s en total).`,cost,effect:'time',amount:3,req:previousTime});previousTime=id;
}
let selectedSkillBranch='boat';
function skillCount(branch){return SKILLS.filter(n=>n.branch===branch&&hasSkill(n.id)).length}
function sessionDuration(){return 30+SKILLS.filter(n=>n.branch==='time'&&n.effect==='time'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0)+relicBonus('time')}
function openTreasureUpgradeDetail(idx){
 const nodes=state.relicUpgradeNodes||(state.relicUpgradeNodes=[]),cost=Math.round(900*Math.pow(1.35,idx)),bought=nodes.includes(idx),ready=idx===nodes.length,after=5+idx+1;
 modal({icon:'🗝️',eyebrow:`TESOROS · MEJORA ${String(idx+1).padStart(2,'0')} DE 15`,title:idx>=0&&idx<15?`Ampliación de reserva ${idx+1}`:'Mejora no disponible',desc:bought?'Esta mejora ya forma parte de tu reserva.':ready?'Amplía la reserva en un espacio permanente. Los huecos para equipar tesoros no cambian.':'Debes comprar las mejoras anteriores en orden.',stats:[['Coste',bought?'Comprada':cash(cost)],['Reserva actual',`${relicCapacity()} / 20 espacios`],['Tras comprar',`${Math.min(20,after)} espacios`],['Equipables','Dependen del barco (máximo 5)']],action:bought?'Cerrar':!ready?'Mejora bloqueada':state.money<cost?'Dinero insuficiente':'Comprar espacio de reserva',onAction:()=>{if(bought||!ready||idx<0||idx>=15||state.money<cost){hideModal();return}state.money-=cost;nodes.push(idx);state.relicStorageLevel=5+nodes.length;save();hideModal();updateTop();renderUpgrades();renderTreasures();renderBook();sound('upgrade');toast(`Reserva ampliada: ${relicCapacity()}/20 espacios`)}});
 if(!bought&&(!ready||state.money<cost))$('modal-action').disabled=true;else $('modal-action').disabled=false;
}
function openAquariumUpgradeDetail(id){
 const skill=AQUARIUM_SKILLS[id];if(!skill)return;const next=AQUARIUM_SKILLS.find(n=>!aquariumOwned(n.id)),bought=aquariumOwned(id),ready=next?.id===id,zoneOk=state.unlocked.includes(skill.zoneGate);
 const effect=skill.type==='space'?`Aumenta la capacidad del acuario a ${Math.min(10,aquariumCapacity()+1)} peces.`:skill.type==='price'?`Aumenta los ingresos diarios del acuario un ${skill.percent} % acumulativo.`:`Mejora la exposición de rarezas: ${skill.unlockLabel}.`;
 modal({icon:skill.icon,eyebrow:`ACUARIO · MEJORA ${String(id+1).padStart(2,'0')} DE 30`,title:skill.name,desc:effect,stats:[['Coste',bought?'Comprada':cash(skill.cost)],['Estado',bought?'Desbloqueada':!ready?'Bloqueada por progresión':!zoneOk?'Zona requerida':'Disponible'],['Requisito de zona',zones[skill.zoneGate]?.name||'Ninguno']],action:bought?'Cerrar':!ready?'Mejora bloqueada':!zoneOk?'Zona bloqueada':state.money<skill.cost?'Dinero insuficiente':'Comprar mejora',onAction:()=>{if(bought||!ready||!zoneOk||state.money<skill.cost){hideModal();return}upgradeAquarium(id);hideModal()}});
 if(!bought&&(!ready||!zoneOk||state.money<skill.cost))$('modal-action').disabled=true;else $('modal-action').disabled=false;
}
function renderUpgrades(){
 const branches=[['boat','🚤','Barco','Velocidad y cardúmenes'],['rod','🎣','Caña','Rarezas y alcance'],['storage','🧺','Bodega','Capacidad y ganancias'],['warehouse','📦','Almacén','Hasta 50 espacios'],['time','⏱️','Tiempo','Hasta 60 segundos'],['aquarium','🐠','Acuario','Capacidad, ingresos y rarezas'],['treasures','🗝️','Tesoros','Reserva y equipamiento']];
 const info=branches.find(x=>x[0]===selectedSkillBranch)||branches[0];
 let nodes=[],tileHTML='';
 if(selectedSkillBranch==='aquarium'){
   nodes=AQUARIUM_SKILLS;
   tileHTML=nodes.map((n,i)=>{const bought=aquariumOwned(n.id),next=AQUARIUM_SKILLS.find(x=>!aquariumOwned(x.id)),ready=next?.id===n.id,zoneOk=state.unlocked.includes(n.zoneGate);return `<button class="skill-tile ${bought?'bought':''} ${ready&&zoneOk?'available':''} ${!ready||!zoneOk?'locked':''}" data-aquarium-upgrade="${n.id}" title="${n.name}: ${n.type==='space'?'aumenta la capacidad':n.type==='price'?'+'+n.percent+'% ingresos acumulativos':'desbloquea exposición '+n.unlockLabel}"><span class="skill-tile-icon">${bought?'✓':n.icon}</span><span class="skill-tile-level">${String(i+1).padStart(2,'0')}</span><span class="skill-tile-status">${bought?'✓':!zoneOk?'🔒':ready?(state.money>=n.cost?'●':'€'):'🔒'}</span></button>`}).join('');
 }else if(selectedSkillBranch==='warehouse'){
   nodes=WAREHOUSE_SKILLS;
   tileHTML=nodes.map((n,i)=>{const bought=warehouseOwned(n.id),next=WAREHOUSE_SKILLS.find(x=>!warehouseOwned(x.id)),ready=next?.id===n.id;return `<button class="skill-tile ${bought?'bought':''} ${ready?'available':''} ${!ready?'locked':''}" data-warehouse-upgrade="${n.id}" title="${n.name}: +${n.amount} espacios (máx. 50)"><span class="skill-tile-icon">${bought?'✓':n.icon}</span><span class="skill-tile-level">${String(i+1).padStart(2,'0')}</span><span class="skill-tile-status">${bought?'✓':ready?(state.money>=n.cost?'●':'€'):'🔒'}</span></button>`}).join('');
 }else if(selectedSkillBranch==='treasures'){
   tileHTML=Array.from({length:15},(_,i)=>{const bought=(state.relicUpgradeNodes||[]).includes(i),ready=!bought&&i===(state.relicUpgradeNodes||[]).length,cost=Math.round(900*Math.pow(1.35,i));return `<button class="skill-tile ${bought?'bought':''} ${ready?'available':''} ${!bought&&!ready?'locked':''}" data-relic-storage-upgrade="${i}" title="${bought?'Mejora comprada':ready?'Desbloquea 1 espacio de reserva (capacidad total: '+(6+i)+' tesoros)':'Compra la mejora anterior primero'}"><span class="skill-tile-icon">${bought?'✓':'🗝️'}</span><span class="skill-tile-level">${String(i+1).padStart(2,'0')}</span><span class="skill-tile-status">${bought?'✓':ready?(state.money>=cost?'●':'€'):'🔒'}</span></button>`}).join('');
 }else{
   nodes=SKILLS.filter(n=>n.branch===selectedSkillBranch);
   tileHTML=nodes.map((n,i)=>{const bought=hasSkill(n.id),ready=!n.req||hasSkill(n.req),affordable=state.money>=n.cost;return `<button class="skill-tile ${bought?'bought':''} ${ready&&!bought?'available':''} ${!ready?'locked':''}" data-skill="${n.id}" aria-label="${n.name}" title="${n.name}"><span class="skill-tile-icon">${bought?'✓':n.icon}</span><span class="skill-tile-level">${String(i+1).padStart(2,'0')}</span><span class="skill-tile-status">${bought?'✓':ready?(affordable?'●':'€'):'🔒'}</span></button>`}).join('');
 }
 const count=selectedSkillBranch==='aquarium'?state.aquariumUpgrades.length:selectedSkillBranch==='treasures'?(state.relicUpgradeNodes||[]).length:selectedSkillBranch==='warehouse'?(state.warehouseUpgrades||[]).length:skillCount(selectedSkillBranch);
 const total=selectedSkillBranch==='aquarium'?30:selectedSkillBranch==='treasures'?15:selectedSkillBranch==='warehouse'?15:nodes.length;
 const tabCount=id=>{if(id==='aquarium')return state.aquariumUpgrades.length+'/30';if(id==='treasures')return ((state.relicUpgradeNodes||[]).length)+'/15';if(id==='warehouse')return ((state.warehouseUpgrades||[]).length)+'/15';return skillCount(id)+'/'+(id==='time'?10:SKILLS.filter(n=>n.branch===id).length)};
 const branchDesc=selectedSkillBranch==='aquarium'?'Alterna capacidad, ingresos acumulativos y cinco mejoras de exposición por rareza.':selectedSkillBranch==='treasures'?`Reserva: 5 espacios iniciales + ${(state.relicUpgradeNodes||[]).length}/15 mejoras = ${relicCapacity()}/20 tesoros guardados. Los huecos equipables dependen del barco.`:selectedSkillBranch==='warehouse'?`Almacén de contratos: ${warehouseCapacity()}/50 espacios. Guarda peces sin venderlos para entregar encargos del puerto.`:(skillBranches[selectedSkillBranch]?.desc||info[3]);
 $('upgrade-grid').innerHTML=`<nav class="skill-tabs" aria-label="Ramas de habilidades">${branches.map(([id,icon,title])=>`<button class="skill-tab ${id===selectedSkillBranch?'active':''}" data-branch="${id}"><span>${icon}</span><b>${title}</b><small>${tabCount(id)}</small></button>`).join('')}</nav><section class="skill-tree-panel branch-${selectedSkillBranch}"><header class="skill-tree-heading"><div><p class="eyebrow">ÁRBOL DE ESPECIALIZACIÓN</p><h2>${info[1]} ${info[2]}</h2><p>${branchDesc}</p></div><strong>${count}/${total}</strong></header><div class="skill-nodes-grid">${tileHTML}</div><div class="skill-legend"><span>🟢 Disponible</span><span>✓ Desbloqueada</span><span>🔒 Bloqueada por requisito</span><span>€ Falta dinero</span></div></section><div class="skill-summary"><b>Tu especialización</b><span>🚤 ${skillCount('boat')} · 🎣 ${skillCount('rod')} · 🧺 ${skillCount('storage')} · 📦 ${(state.warehouseUpgrades||[]).length}/15 · ⏱️ ${skillCount('time')} · 🐠 ${state.aquariumUpgrades.length}/30 · 🗝️ ${(state.relicUpgradeNodes||[]).length}/15 · Almacén ${warehouseCapacity()}/50</span><small>Las mejoras se compran en orden y sus efectos se acumulan. Duración actual: ${sessionDuration()} segundos.</small></div>`;
}
function openSkillDetail(id){const n=SKILLS.find(x=>x.id===id);if(!n)return;const bought=hasSkill(id),ready=!n.req||hasSkill(n.req),affordable=state.money>=n.cost;const req=n.req?SKILLS.find(x=>x.id===n.req):null;modal({icon:n.icon,eyebrow:`RAMA ${skillBranches[n.branch].title.toUpperCase()} · NIVEL ${n.branch==='time'?n.id.slice(1):SKILLS.filter(x=>x.branch===n.branch).findIndex(x=>x.id===n.id)+1}`,title:n.name,desc:n.desc,stats:[['Precio',bought?'Comprada':cash(n.cost)],['Estado',bought?'Desbloqueada':!ready?'Bloqueada':'Disponible'],['Requisito',req?req.name:'Ninguno']],action:bought?'Cerrar':!ready?'Requisito pendiente':!affordable?'Dinero insuficiente':'Desbloquear habilidad',onAction:()=>{if(bought||!ready||!affordable){hideModal();return}buySkill(id);hideModal()}});if(!bought&&(!ready||!affordable))$('modal-action').disabled=true;else $('modal-action').disabled=false}
function buySkill(id){const n=SKILLS.find(x=>x.id===id);if(!n||hasSkill(id)||(n.req&&!hasSkill(n.req))||state.money<n.cost)return;state.money-=n.cost;state.skillNodes.push(id);sound('upgrade');save();updateTop();renderUpgrades();toast('Habilidad desbloqueada: '+n.name)}

function renderBook(){
 const query=($('fish-search')?.value||'').trim().toLocaleLowerCase('es');
 const filter=$('rarity-filter')?.value||'all';
 const zoneF=$('zone-filter')?.value||'all';
 const missingOnly=!!$('missing-only')?.checked;
 const seen=discoveredSet();
 let list=fish.filter(f=>{
  if(query){
   const q=query;
   if(!(f.name.toLocaleLowerCase('es').includes(q)||String(f.id).includes(q)||String(f.id+1).includes(q)||(f.zones||[]).some(z=>String(z).toLocaleLowerCase('es').includes(q))))return false;
  }
  if(filter==='unknown'&&seen.has(f.id))return false;
  if(filter!=='all'&&filter!=='unknown'&&rarities[f.rarity]!==filter)return false;
  if(missingOnly&&seen.has(f.id))return false;
  if(zoneF==='event'){if(!f.event)return false}
  else if(zoneF!=='all'){
   const zi=Number(zoneF);
   if(Number.isNaN(zi))return true;
   if(f.event)return false;
   if((f.minZone||0)!==zi)return false;
  }
  return true;
 });
 const pages=Math.max(1,Math.ceil(list.length/36));
 bookPage=Math.max(0,Math.min(bookPage,pages-1));
 if($('book-progress'))$('book-progress').textContent=`${seen.size.toLocaleString('es-ES')} de ${fish.length.toLocaleString('es-ES')} especies descubiertas`;
 if($('book-bar'))$('book-bar').style.width=(seen.size/Math.max(1,fish.length)*100)+'%';
 if($('page-label'))$('page-label').textContent=`Página ${bookPage+1} / ${pages}`;
 if($('prev-page'))$('prev-page').disabled=bookPage===0;
 if($('next-page'))$('next-page').disabled=bookPage>=pages-1;
 if($('fish-grid'))$('fish-grid').innerHTML=list.slice(bookPage*36,bookPage*36+36).map(f=>{
  const got=seen.has(f.id);
  const zoneLabel=f.event?'Evento · '+((f.zones||[])[0]||''):((f.zones&&f.zones.length)?(f.zones.length===1?f.zones[0]:f.zones[0]+' +'+(f.zones.length-1)):zones[f.minZone||0]?.name||'—');
  return `<article class="fish-card" data-fish-info="${f.id}"><span class="fish-emoji">${got?f.emoji:'❔'}</span><b>${got?f.name:`Especie desconocida`}</b><span class="rarity r${f.rarity}">${got?rarities[f.rarity]:'Por descubrir'}</span><br><small>${got?`${zoneLabel} · ${f.depth} m · ${f.weight} kg · ${cash(f.value)}`:'Descúbrela en expedición o gachapón'}</small></article>`;
 }).join('')||'<div class="empty-state">No se han encontrado especies.</div>';
}

function renderHold(){
 const total=state.hold.reduce((n,id)=>n+price(fish[id]),0);
 $('hold-value').textContent=cash(total);
 $('hold-capacity').textContent=`${state.hold.length} / ${capacity()}`;
 $('sell-all').disabled=!state.hold.length;
 $('hold-list').classList.toggle('hold-grid',state.hold.length>0);
 $('hold-list').innerHTML=state.hold.length?state.hold.map((id,index)=>{const f=fish[id];const canStore=(state.warehouse||[]).length<warehouseCapacity();return `<article class="hold-fish-card rborder${f.rarity}"><span class="hold-fish-emoji">${f.emoji}</span><b>${f.name}</b><small class="r${f.rarity}">${rarities[f.rarity]} · ${f.weight} kg</small><strong>${cash(price(f))}</strong><div class="hold-actions"><button class="secondary" data-sell="${index}">Vender</button><button class="secondary" data-store="${index}" ${canStore?'':'disabled'} title="${canStore?'Guardar en almacén':'Almacén lleno'}">Almacenar</button></div></article>`}).join(''):'<div class="empty-state"><span>🧺</span>La bodega está vacía.<br>Sal a pescar para conseguir capturas.</div>';
 const wh=state.warehouse||[],wcap=warehouseCapacity(),wVal=wh.reduce((n,id)=>n+(fish[id]?price(fish[id]):0),0);
 if($('warehouse-capacity'))$('warehouse-capacity').textContent=`${wh.length} / ${wcap}`;
 if($('warehouse-value'))$('warehouse-value').textContent=cash(wVal);
 if($('warehouse-list')){
  $('warehouse-list').classList.toggle('hold-grid',wh.length>0);
  $('warehouse-list').innerHTML=wh.length?wh.map((id,index)=>{const f=fish[id];if(!f)return '';return `<article class="hold-fish-card rborder${f.rarity}"><span class="hold-fish-emoji">${f.emoji}</span><b>${f.name}</b><small class="r${f.rarity}">${rarities[f.rarity]} · base · ${f.weight} kg</small><strong>${cash(price(f))}</strong><div class="hold-actions"><button class="secondary" data-unstore="${index}">A bodega</button><button class="secondary" data-sell-warehouse="${index}">Vender</button></div></article>`}).join(''):'<div class="empty-state"><span>📦</span>El almacén está vacío.<br>Guarda peces de la bodega para completar contratos.</div>';
 }
}
function renderExpeditionHold(){const count=state.hold.length;updateExpeditionHoldCounter();$('expedition-hold-list').classList.toggle('hold-grid',count>0);$('expedition-hold-list').innerHTML=count?state.hold.map(id=>{const f=fish[id];return `<article class="hold-fish-card rborder${f.rarity}"><span class="hold-fish-emoji">${f.emoji}</span><b>${f.name}</b><small class="r${f.rarity}">${rarities[f.rarity]} · ${f.weight} kg</small><strong>${cash(price(f))}</strong></article>`}).join(''):'<div class="empty-state"><span>🧺</span>La bodega está vacía.<br>¡Pesca para guardar tus primeras capturas!</div>'}
function openExpeditionHold(){if(!sessionActive)return;sessionActive=false;expeditionPausedForHold=true;keys.left=false;keys.right=false;lastFrame=0;renderExpeditionHold();$('expedition-hold-panel').classList.remove('hidden');$('fishing').classList.add('hold-open');sound('click')}
function closeExpeditionHold(){if(!expeditionPausedForHold)return;expeditionPausedForHold=false;$('expedition-hold-panel').classList.add('hidden');$('fishing').classList.remove('hold-open');sessionActive=true;lastFrame=0;startLoop();sound('click')}
const relicTemplates=[
['🧿','Ojo de las mareas','rare', 'Aumenta un 6 % la probabilidad de encontrar peces raros.',{rare:.06}],['🪶','Pluma de albatros','common','Aumenta un 5 % la velocidad del barco.',{speed:.05}],['🪙','Moneda del capitán','uncommon','Las ventas generan un 8 % más.',{sale:.08}],['🐚','Caracola ancestral','rare','Las expediciones duran 2 segundos más.',{time:2}],['🧭','Rosa de los vientos','epic','Aumenta un 12 % la probabilidad de rarezas.',{rare:.12}],['💎','Corazón abisal','legendary','Las ventas generan un 20 % más.',{sale:.20}],['👑','Corona del Leviatán','mythic','Las ventas generan un 30 % más.',{sale:.30}],['🪬','Amuleto de coral','uncommon','Aumenta un 8 % la velocidad del barco.',{speed:.08}],['⚓','Ancla de plata','epic','Aumenta el margen de captura.',{radius:1}],['🌟','Estrella sumergida','mythic','Aumenta un 18 % la probabilidad de rarezas.',{rare:.18}],['🦈','Diente de monstruo','legendary','Aumenta un 15 % el valor de venta.',{sale:.15}],['🫧','Perla de sirena','rare','Añade un 5 % a los ingresos del acuario.',{aquarium:.05}]
].map((x,i)=>({templateId:i,emoji:x[0],name:x[1],rank:x[2],passive:x[3],bonus:x[4],value:[180,320,700,1400,3200,8500,24000][['common','uncommon','rare','epic','legendary','mythic'].indexOf(x[2])]||500}));
const relicRarity=['Común','Poco común','Raro','Épico','Legendario','Mítico'];const relicRarityIndex={common:0,uncommon:1,rare:2,epic:3,legendary:4,mythic:5};
function boatRelicSlots(){return Math.max(1,Math.min(5,(Number(state.boatSkin)||0)+1))}function relicCapacity(){return 5+Math.min(15,(state.relicUpgradeNodes||[]).length)} function equippedTreasureItems(){return (state.equippedRelics||[]).map(id=>[...(state.relics||[]),...(state.treasures||[])].find(item=>String(item.id)===String(id))).filter(Boolean)} function relicBonus(key){return equippedTreasureItems().reduce((n,item)=>{let bonus=item.bonus;if(!bonus&&item.name){const template=treasureTypes.find(t=>t.name===item.name);bonus=template?.bonus;if(template){item.bonus=template.bonus;item.passive=item.passive||template.passive}}return n+(Number(bonus?.[key])||0)},0)} function findRelic(){if((state.relics||[]).length+(state.treasures||[]).length>=relicCapacity())return null;if(Math.random()>.14+state.zone*0.01)return null;const maxR=maxTreasureRarityForZone(state.zone);const rankRoll=Math.random();let rank=rankRoll>.997?5:rankRoll>.975?4:rankRoll>.88?3:rankRoll>.62?2:rankRoll>.32?1:0;rank=Math.min(rank,maxR);const rankKeys=['common','uncommon','rare','epic','legendary','mythic'];const candidates=relicTemplates.filter(t=>rankKeys.indexOf(t.rank)===rank);const t=candidates[Math.floor(Math.random()*candidates.length)]||relicTemplates.filter(x=>rankKeys.indexOf(x.rank)<=maxR)[0]||relicTemplates[0];const item={...t,id:'rel-'+Date.now()+'-'+Math.random().toString(36).slice(2),rarity:rank,value:Math.max(25,Math.round(t.value*treasureZoneScale(state.zone))),zone:currentZone().name};state.relics.push(item);return item}
function renderRelics(){const list=state.relics||[];$('treasure-list').innerHTML=list.length?list.map(r=>{const equipped=(state.equippedRelics||[]).includes(r.id);return `<article class="feature-card"><div class="feature-emoji">${r.emoji}</div><h3>${r.name}</h3><p>${relicRarity[r.rarity]||'Tesoro'} · ${r.passive||''}</p><strong>${cash(r.value)}</strong><button class="secondary" data-equip-relic="${r.id}" ${equipped||state.equippedRelics.length>=boatRelicSlots()?'disabled':''}>${equipped?'Equipado':'Equipar'}</button><button class="secondary" data-sell-relic="${r.id}">Vender</button></article>`}).join(''):'<div class="empty-state">🗝️ Explora expediciones para encontrar tesoros equipables.</div>';const info=document.getElementById('relic-summary');if(info)info.textContent=`Equipados ${(state.equippedRelics||[]).length}/${boatRelicSlots()} · Huecos equipables libres ${boatRelicSlots()-(state.equippedRelics||[]).length} · Reserva ${list.length}/${relicCapacity()}`;}
const treasureTypes=(()=>{const base=[
{name:'Monedas de galeón',emoji:'🪙',value:180,rarity:0,minZone:0},{name:'Ancla oxidada',emoji:'⚓',value:220,rarity:0,minZone:0},{name:'Botella con mensaje',emoji:'🍾',value:260,rarity:0,minZone:0},
{name:'Brújula antigua',emoji:'🧭',value:420,rarity:1,minZone:1},{name:'Mapa incompleto',emoji:'🗺️',value:480,rarity:1,minZone:1},{name:'Farol de proa',emoji:'🔦',value:510,rarity:1,minZone:1},
{name:'Cofre de capitán',emoji:'🧰',value:850,rarity:2,minZone:2},{name:'Estatuilla de coral',emoji:'🪸',value:1250,rarity:2,minZone:2},{name:'Cáliz de plata',emoji:'🏆',value:1100,rarity:2,minZone:3},
{name:'Ídolo de obsidiana',emoji:'🗿',value:1800,rarity:3,minZone:4},{name:'Anillo de mareas',emoji:'💍',value:2100,rarity:3,minZone:4},{name:'Relicario abisal',emoji:'📿',value:2400,rarity:3,minZone:5},
{name:'Corona del naufragio',emoji:'👑',value:3200,rarity:4,minZone:6},{name:'Tridente roto',emoji:'🔱',value:3800,rarity:4,minZone:6},{name:'Orbe de tormenta',emoji:'⚡',value:4200,rarity:4,minZone:7},
{name:'Corazón de leviatán',emoji:'❤️',value:8000,rarity:5,minZone:8},{name:'Lágrima del portal',emoji:'💧',value:9500,rarity:5,minZone:9},{name:'Cetro de las profundidades',emoji:'🪄',value:12000,rarity:5,minZone:9},
{name:'Medallón pirata',emoji:'🏅',value:900,rarity:2,minZone:2},{name:'Daga ceremonial',emoji:'🗡️',value:1600,rarity:3,minZone:3},{name:'Esfera lunar',emoji:'🔮',value:2800,rarity:3,minZone:5},
{name:'Máscara de coral',emoji:'🎭',value:2000,rarity:3,minZone:4},{name:'Astrolabio real',emoji:'🧭',value:3500,rarity:4,minZone:5},{name:'Gema del vacío',emoji:'💠',value:7000,rarity:5,minZone:8},
{name:'Campana de barco',emoji:'🔔',value:700,rarity:1,minZone:1},{name:'Timón tallado',emoji:'☸️',value:1400,rarity:2,minZone:3},{name:'Bandera espectral',emoji:'🚩',value:2600,rarity:3,minZone:6},
{name:'Perla negra',emoji:'🖤',value:5000,rarity:4,minZone:7},{name:'Escama de dragón marino',emoji:'🐉',value:11000,rarity:5,minZone:9}
];const adjectives=['Antiguo','Dorado','Maldito','Real','Abisal','Coralino','Olvidado','Cristalino','Pirata','Imperial','Misterioso','Volcánico','Espectral','Náutico','Celestial','Oxidado','Perlado','Runificado','Hundido','Legendario','Tropical','Glacial','Lunar','Sagrado','Prohibido'];const artifacts=[['medallón','🏅'],['cáliz','🏆'],['ídolo','🗿'],['anillo','💍'],['relicario','📿'],['astrolabio','🧭'],['cofre','🧰'],['esfera','🔮'],['máscara','🎭'],['daga ceremonial','🗡️'],['gema','💎'],['corona','👑'],['pergamino','📜'],['campana','🔔'],['amuleto','🪬']];const generated=[];let n=0;for(const adj of adjectives){for(const [noun,emoji] of artifacts){n++;const rarity=Math.min(5,Math.floor((n-1)/65));const fixedName=(typeof FIXED_TREASURE_NAMES!=='undefined'&&FIXED_TREASURE_NAMES[n-1])?FIXED_TREASURE_NAMES[n-1]:(noun[0].toLocaleUpperCase('es')+noun.slice(1)+' '+adj);generated.push({name:fixedName,emoji,value:Math.round(160*Math.pow(1.025,n)*(1+rarity*.7)),rarity,minZone:Math.min(9,Math.floor((n-1)/40)),passive:'Pieza de colección recuperada de un naufragio',catalogId:`treasure-${n}`})}}return [...base,...generated].map((t,i)=>{const tier=Math.max(0,Math.min(5,Number(t.rarity)||0)),amount=[.025,.04,.06,.09,.13,.18][tier],effect=['rare','sale','speed','aquarium','time'][i%5],bonus=effect==='time'?{time:1+tier}: {[effect]:amount};const descriptions={rare:`Aumenta un ${Math.round(amount*100)} % la probabilidad de encontrar peces raros.`,sale:`Aumenta un ${Math.round(amount*100)} % el valor de venta de los peces.`,speed:`Aumenta un ${Math.round(amount*100)} % la velocidad del barco.`,aquarium:`Aumenta un ${Math.round(amount*100)} % los ingresos diarios del acuario.`,time:`Añade ${1+tier} segundo${tier?'s':''} a cada expedición.`};return {...t,passive:descriptions[effect],bonus:t.bonus||bonus}})})();
function normalizeTreasureAbilities(){
 // Repara partidas antiguas: sustituye las descripciones genéricas y cualquier bonus
 // desactualizado por la habilidad real definida para cada tesoro.
 for(const item of (state.treasures||[])){
  const template=treasureTypes.find(t=>t.name===item.name);
  if(template){item.passive=template.passive;item.bonus={...template.bonus};item.rarity=template.rarity;}
 }
 for(const item of (state.relics||[])){
  const template=relicTemplates.find(t=>String(t.templateId)===String(item.templateId))||relicTemplates.find(t=>t.name===item.name);
  if(template){item.templateId=template.templateId;item.passive=template.passive;item.bonus={...template.bonus};item.rank=template.rank;item.rarity=relicRarityIndex[template.rank]??item.rarity;}
 }
}
const boatTypes=[
{name:'Barco de madera',emoji:'⛵',cost:0,desc:'1 espacio tesoro. Sin pasivas especiales.',slots:1,passives:{hold:0,treasure:0,rare:0,zoneBonus:null}},
{name:'Lancha de pesca',emoji:'🚤',cost:1800,desc:'2 tesoros · +2 bodega · +10 % tesoros.',slots:2,passives:{hold:2,treasure:.10,rare:0,zoneBonus:null}},
{name:'Cúter oceánico',emoji:'🛥️',cost:12000,desc:'3 tesoros · +4 bodega · +15 % rareza en Mar abierto y más allá.',slots:3,passives:{hold:4,treasure:.08,rare:.12,zoneBonus:[3,4,5,6,7,8,9]}},
{name:'Yate explorador',emoji:'🚢',cost:85000,desc:'4 tesoros · +6 bodega · +20 % tesoros · +15 % rareza global.',slots:4,passives:{hold:6,treasure:.20,rare:.15,zoneBonus:null}},
{name:'Leviatán',emoji:'🐉',cost:450000,desc:'5 tesoros · +10 bodega · +25 % tesoros · +25 % rareza · bonus en zonas altas.',slots:5,passives:{hold:10,treasure:.25,rare:.25,zoneBonus:[6,7,8,9,10]}}
];
const ZONE_COINS=[
{id:0,name:'Moneda de costa',emoji:'🪙',color:'#94a3b8'},
{id:1,name:'Moneda de coral',emoji:'🟠',color:'#fb923c'},
{id:2,name:'Moneda esmeralda',emoji:'🟢',color:'#34d399'},
{id:3,name:'Moneda oceánica',emoji:'🔵',color:'#38bdf8'},
{id:4,name:'Moneda tropical',emoji:'🟡',color:'#fbbf24'},
{id:5,name:'Moneda glacial',emoji:'❄️',color:'#e0f2fe'},
{id:6,name:'Moneda abisal',emoji:'🟣',color:'#a78bfa'},
{id:7,name:'Moneda de naufragio',emoji:'⚓',color:'#78716c'},
{id:8,name:'Moneda estelar',emoji:'✨',color:'#fde68a'},
{id:9,name:'Moneda de Leviatán',emoji:'🐉',color:'#c4b5fd'}
];
const BAITS=[
{id:'common',name:'Cebo común',emoji:'🪱',cost:40,desc:'Más peces comunes.',commonMul:1.5,rareMul:.7,deepMul:1},
{id:'rare',name:'Señuelo brillante',emoji:'✨',cost:180,desc:'Más rarezas.',commonMul:.6,rareMul:1.8,deepMul:1},
{id:'shark',name:'Cebo de sangre',emoji:'🩸',cost:320,desc:'Atrae tiburones y depredadores.',commonMul:.5,rareMul:1.3,deepMul:1,boostBases:[21,22,23,24]},
{id:'deep',name:'Plomada abisal',emoji:'⚓',cost:250,desc:'Más peces de profundidad.',commonMul:.8,rareMul:1.1,deepMul:2.2},
{id:'night',name:'Luz de luna',emoji:'🌙',cost:200,desc:'Ideal de noche: +rareza nocturna.',commonMul:.7,rareMul:1.4,deepMul:1.2,nightBonus:1.3}
];
const ZONE_BOSSES=[
{zone:0,name:'Rey de la costa',emoji:'👑',base:9,hp:3,reward:400,night:false},
{zone:0,name:'Sombra de la costa',emoji:'🌑',base:11,hp:4,reward:650,night:true},
{zone:1,name:'Guardián de coral',emoji:'🪸',base:17,hp:4,reward:900,night:false},
{zone:1,name:'Coral nocturno',emoji:'🌙',base:19,hp:5,reward:1400,night:true},
{zone:2,name:'Señor esmeralda',emoji:'🌿',base:41,hp:4,reward:1800,night:false},
{zone:2,name:'Espectro verde',emoji:'👻',base:42,hp:5,reward:2800,night:true},
{zone:3,name:'Titán del mar abierto',emoji:'🌊',base:23,hp:5,reward:4000,night:false},
{zone:3,name:'Tiburón lunar',emoji:'🦈',base:24,hp:6,reward:6000,night:true},
{zone:4,name:'Emperador tropical',emoji:'🌺',base:45,hp:5,reward:8000,night:false},
{zone:4,name:'Emperador del eclipse',emoji:'🌑',base:46,hp:6,reward:12000,night:true},
{zone:5,name:'Coloso glacial',emoji:'🧊',base:24,hp:6,reward:15000,night:false},
{zone:5,name:'Coloso de medianoche',emoji:'❄️',base:28,hp:7,reward:22000,night:true},
{zone:6,name:'Horror abisal',emoji:'🌑',base:55,hp:6,reward:28000,night:false},
{zone:6,name:'Horror del vacío',emoji:'👁️',base:56,hp:7,reward:40000,night:true},
{zone:7,name:'Capitán fantasma',emoji:'👻',base:56,hp:7,reward:45000,night:false},
{zone:7,name:'Almirante espectral',emoji:'☠️',base:57,hp:8,reward:65000,night:true},
{zone:8,name:'Estrella viviente',emoji:'✨',base:58,hp:7,reward:70000,night:false},
{zone:8,name:'Estrella muerta',emoji:'💫',base:59,hp:8,reward:100000,night:true},
{zone:9,name:'Leviatán anciano',emoji:'🐲',base:59,hp:8,reward:120000,night:false},
{zone:9,name:'Leviatán onírico',emoji:'🐉',base:54,hp:9,reward:180000,night:true},
{zone:10,name:'Guardian del portal',emoji:'🌀',base:57,hp:9,reward:200000,night:false},
{zone:10,name:'Guardian del eclipse',emoji:'🕳️',base:58,hp:10,reward:300000,night:true}
];
function currentBoss(zone=state.zone){
 const night=!!state.isNight;
 const list=ZONE_BOSSES.filter(b=>b.zone===zone&&!!b.night===night);
 return list[0]||ZONE_BOSSES.find(b=>b.zone===zone)||null;
}
function bossKey(zone=state.zone){return (state.isNight?'n':'d')+zone}
const EVENT_LEGENDARIES={
 abyssal_eclipse:{name:'Pez Eclipse',emoji:'🌑',base:55,rarity:5},
 secret_gate:{name:'Carpintero del portal',emoji:'🌀',base:57,rarity:5},
 crystal_night:{name:'Cristal viviente',emoji:'💎',base:58,rarity:5},
 ghost_fog:{name:'Ánima brumosa',emoji:'👻',base:56,rarity:5}
};


const missionDefs=[
{id:'catch10',title:'Primeros pasos',desc:'Pesca 10 peces en total.',goal:10,reward:350,icon:'🎣',progress:()=>state.totalCaught},
{id:'catch50',title:'Pescador habitual',desc:'Pesca 50 peces en total.',goal:50,reward:1200,icon:'🐟',progress:()=>state.totalCaught},
{id:'catch150',title:'Maestro de la caña',desc:'Pesca 150 peces en total.',goal:150,reward:4500,icon:'🏆',progress:()=>state.totalCaught},
{id:'catch400',title:'Leyenda del puerto',desc:'Pesca 400 peces en total.',goal:400,reward:18000,icon:'👑',progress:()=>state.totalCaught},
{id:'discover20',title:'Naturalista novato',desc:'Descubre 20 especies distintas.',goal:20,reward:600,icon:'📖',progress:()=>state.discovered.length},
{id:'discover80',title:'Enciclopedia abierta',desc:'Descubre 80 especies distintas.',goal:80,reward:3500,icon:'📚',progress:()=>state.discovered.length},
{id:'discover250',title:'Catalogador oceánico',desc:'Descubre 250 especies distintas.',goal:250,reward:15000,icon:'🗺️',progress:()=>state.discovered.length},
{id:'rare5',title:'Coleccionista de rarezas',desc:'Descubre 5 especies épicas, legendarias o míticas.',goal:5,reward:900,icon:'✨',progress:()=>state.discovered.filter(id=>fish[id]&&fish[id].rarity>=3).length},
{id:'rare15',title:'Cazador de leyendas',desc:'Descubre 15 especies épicas o superiores.',goal:15,reward:5000,icon:'💎',progress:()=>state.discovered.filter(id=>fish[id]&&fish[id].rarity>=3).length},
{id:'mythic1',title:'Encuentro mítico',desc:'Descubre al menos 1 pez mítico.',goal:1,reward:8000,icon:'🐉',progress:()=>state.discovered.filter(id=>fish[id]&&fish[id].rarity>=5).length},
{id:'treasure3',title:'Cazatesoros',desc:'Encuentra 3 tesoros durante las expediciones.',goal:3,reward:1200,icon:'🗝️',progress:()=>(state.treasures||[]).length+(state.relics||[]).length},
{id:'treasure10',title:'Cazatesoros veterano',desc:'Ten 10 tesoros en reserva a la vez.',goal:10,reward:6000,icon:'🏺',progress:()=>(state.treasures||[]).length+(state.relics||[]).length},
{id:'day7',title:'Una semana en el mar',desc:'Alcanza el día 7 de tu aventura.',goal:7,reward:1000,icon:'📅',progress:()=>state.day},
{id:'day20',title:'Capitán experimentado',desc:'Alcanza el día 20.',goal:20,reward:4500,icon:'⛵',progress:()=>state.day},
{id:'day50',title:'Veterano de las mareas',desc:'Alcanza el día 50.',goal:50,reward:20000,icon:'🌊',progress:()=>state.day},
{id:'zones3',title:'Explorador costero',desc:'Desbloquea 3 zonas de pesca.',goal:3,reward:1500,icon:'🏝️',progress:()=>(state.unlocked||[]).length},
{id:'zones6',title:'Cartógrafo marino',desc:'Desbloquea 6 zonas de pesca.',goal:6,reward:8000,icon:'🧭',progress:()=>(state.unlocked||[]).length},
{id:'zones10',title:'Rey de los océanos',desc:'Desbloquea las 10 zonas.',goal:10,reward:50000,icon:'🌐',progress:()=>(state.unlocked||[]).length},
{id:'sales5k',title:'Comerciante del puerto',desc:'Acumula 5.000 € en ventas totales.',goal:5000,reward:800,icon:'💰',progress:()=>Math.floor(state.totalSales||0)},
{id:'sales50k',title:'Magnate pesquero',desc:'Acumula 50.000 € en ventas totales.',goal:50000,reward:6000,icon:'🏦',progress:()=>Math.floor(state.totalSales||0)},
{id:'sales250k',title:'Emperador del mercado',desc:'Acumula 250.000 € en ventas totales.',goal:250000,reward:25000,icon:'💎',progress:()=>Math.floor(state.totalSales||0)},
{id:'boat2',title:'Mejor barco',desc:'Adquiere el segundo barco o superior.',goal:1,reward:500,icon:'🚤',progress:()=>(Number(state.boatSkin)||0)>=1?1:0},
{id:'boat4',title:'Flota de lujo',desc:'Adquiere el yate explorador o el Leviatán.',goal:1,reward:8000,icon:'🚢',progress:()=>(Number(state.boatSkin)||0)>=3?1:0},
{id:'skills5',title:'Aprendiz de puerto',desc:'Desbloquea 5 mejoras del árbol de habilidades.',goal:5,reward:700,icon:'🛠️',progress:()=>(state.skillNodes||[]).length},
{id:'skills20',title:'Especialista naval',desc:'Desbloquea 20 mejoras del árbol de habilidades.',goal:20,reward:9000,icon:'⚙️',progress:()=>(state.skillNodes||[]).length},
{id:'aquarium3',title:'Pecera con vida',desc:'Expón 3 peces en el acuario.',goal:3,reward:1000,icon:'🐠',progress:()=>(state.aquarium||[]).length},
{id:'warehouse5',title:'Logística básica',desc:'Guarda 5 peces a la vez en el almacén.',goal:5,reward:600,icon:'📦',progress:()=>(state.warehouse||[]).length},
{id:'contracts3',title:'Contratista fiable',desc:'Completa 3 contratos de entrega.',goal:3,reward:2000,icon:'📋',progress:()=>state._contractsDone||0}
];
function renderBoat(){const level=Math.min(boatTypes.length-1,Math.max(0,Number(state.boatSkin)||0)),b=boatTypes[level];$('boat-emoji').textContent=b.emoji;$('boat-name').textContent=b.name;$('boat-stats').textContent=`Barco ${level+1}/${boatTypes.length} · Tesoro ${boatRelicSlots()}/5 · Bodega +${boatPassive('hold')} · Tesoros +${Math.round(boatPassive('treasure')*100)}% · Rareza +${Math.round(boatPassive('rare')*100)}%`;$('boat-options').innerHTML=boatTypes.map((x,i)=>`<article class="feature-card ${i===level?'feature-active':''}"><div class="feature-emoji">${x.emoji}</div><h3>${x.name}</h3><p>${x.desc}</p><small>${x.slots} espacio${x.slots>1?'s':''} equipable${x.slots>1?'s':''}${i===level?' · ACTUAL':i<level?' · Desbloqueado':' · Coste: '+cash(x.cost)}</small><button class="${i===level?'secondary':'primary'}" data-boat="${i}" ${i<=level||state.money<x.cost?'disabled':''}>${i===level?'Equipado':i<level?'Adquirido':'Comprar y equipar'}</button></article>`).join('')}
function buyBoat(level){const b=boatTypes[level];if(!b||level<=state.boatSkin||state.money<b.cost)return;state.money-=b.cost;state.boatSkin=level;state.boat=Math.max(1,level+1);save();updateTop();renderBoat();sound('upgrade');toast(`¡Barco mejorado! ${b.name} · ${b.slots} espacios de tesoro`)}
function renderTreasures(){
 const treasures=state.treasures||[],relics=state.relics||[],all=[...relics.map(r=>({...r,isRelic:true})),...treasures.map(t=>({...t,isRelic:false}))];
 $('treasure-count').textContent=all.length;
 $('treasure-value').textContent=cash(all.reduce((sum,t)=>sum+(Number(t.value)||0),0));
 $('treasure-summary').textContent=`${all.length} tesoros encontrados`;
 $('sell-treasures').disabled=!all.length;
 const slots=$('treasure-slots'),equippedItems=equippedTreasureItems();
 if(slots) slots.innerHTML=Array.from({length:5},(_,i)=>{
  const equipped=equippedItems[i],unlocked=i<boatRelicSlots();
  return `<article class="treasure-slot ${equipped?'filled':''} ${!unlocked?'locked':''}">${equipped?`<button type="button" class="treasure-slot-emoji" data-unequip-relic="${String(equipped.id)}" title="Retirar ${equipped.name}">${equipped.emoji}</button><b>${equipped.name}</b><small>${equipped.passive||'Bonificación pasiva'}</small><button type="button" class="secondary" data-unequip-relic="${String(equipped.id)}">Retirar</button>`:unlocked?`<span class="treasure-slot-emoji">＋</span><b>Espacio libre</b><small>Equipa cualquier tesoro de tu reserva para activar su habilidad.</small>`:`<span class="treasure-slot-emoji">🔒</span><b>Bloqueado</b><small>Mejora tu barco para desbloquear este hueco equipable.</small>`}</article>`;
 }).join('');
 $('treasure-list').innerHTML=all.length?all.map(t=>{
  const equipped=(state.equippedRelics||[]).some(id=>String(id)===String(t.id));
  const template=!t.isRelic?treasureTypes.find(x=>x.name===t.name):null;
  const passive=(template&&template.passive)||t.passive||'Bonificación pasiva';
  const rarityName=t.isRelic?(relicRarity[Number(t.rarity)]||relicRarity[relicRarityIndex[t.rank]]||'Tesoro'):(relicRarity[Number(t.rarity)]||'Tesoro');
  if(template){t.bonus={...template.bonus};t.passive=template.passive;}
  return `<article class="feature-card"><div class="feature-emoji">${t.emoji}</div><h3>${t.name}</h3><p>${rarityName} · ${passive}</p><strong>${cash(t.value)}</strong><div class="treasure-actions"><button type="button" class="primary" data-equip-relic="${String(t.id)}" ${equipped||state.equippedRelics.length>=boatRelicSlots()?'disabled':''}>${equipped?'Equipado':'Equipar'}</button><button type="button" class="secondary" ${t.isRelic?`data-sell-relic="${String(t.id)}"`:`data-sell-treasure="${String(t.id)}"`}>Vender</button></div></article>`;
 }).join(''):'<div class="empty-state">🗝️ Todavía no has encontrado tesoros. Explora expediciones para conseguir piezas con habilidades pasivas; equípalas desde tu reserva o véndelas en el puerto.</div>';
 const info=document.getElementById('relic-summary');
 if(info)info.textContent=`Equipados ${equippedItems.length}/${boatRelicSlots()} · Reserva ${all.length}/${relicCapacity()} tesoros · ${boatRelicSlots()}/5 espacios equipables por barco`;
 renderTreasureEncyclopedia();
}
function treasureCatalog(){return [...relicTemplates.map(t=>({...t,rarity:relicRarityIndex[t.rank]??0,kind:'relic',catalogKey:`relic:${t.templateId}`})),...treasureTypes.map(t=>({...t,kind:'treasure',catalogKey:`treasure:${t.name}`}))]}
function treasureCatalogFound(t){return t.kind==='relic'?(state.relics||[]).some(r=>r.templateId===t.templateId):(state.treasures||[]).some(r=>r.name===t.name)}
function renderTreasureEncyclopedia(){const root=$('treasure-encyclopedia-list');if(!root)return;const fullCatalog=treasureCatalog(),discoveredCount=fullCatalog.filter(t=>treasureCatalogFound(t)).length,query=($('treasure-search')?.value||'').trim().toLocaleLowerCase('es'),filter=$('treasure-rarity-filter')?.value||'all';let catalog=fullCatalog.filter(t=>{const found=treasureCatalogFound(t),rarity=Number.isInteger(t.rarity)&&t.rarity>=0&&t.rarity<=5?t.rarity:Math.max(0,Math.min(5,relicRarityIndex[t.rank]??relicRarity.indexOf(t.rank)??0));const queryMatch=!query||(found&&t.name.toLocaleLowerCase('es').includes(query));const filterMatch=filter==='all'||(filter==='found'&&found)||(filter==='unknown'&&!found)||(/^\d$/.test(filter)&&rarity===Number(filter));return queryMatch&&filterMatch});const pages=Math.max(1,Math.ceil(catalog.length/24));treasureBookPage=Math.max(0,Math.min(treasureBookPage,pages-1));$('treasure-catalog-count').textContent=`${discoveredCount.toLocaleString('es-ES').padStart(3,'0')} de ${fullCatalog.length} tesoros descubiertos`;$('treasure-page-label').textContent=`Página ${treasureBookPage+1} / ${pages}`;$('treasure-prev-page').disabled=treasureBookPage===0;$('treasure-next-page').disabled=treasureBookPage>=pages-1;root.innerHTML=catalog.slice(treasureBookPage*24,treasureBookPage*24+24).map(t=>{const found=treasureCatalogFound(t);const rarity=Number.isInteger(t.rarity)&&t.rarity>=0&&t.rarity<=5?t.rarity:Math.max(0,Math.min(5,relicRarityIndex[t.rank]??relicRarity.indexOf(t.rank)??0));const rarityName=relicRarity[rarity]||t.rank||'Común';const safeKey=t.catalogKey.replace(/&/g,'&amp;').replace(/"/g,'&quot;');const foundItem=found?(t.kind==='relic'?(state.relics||[]).find(r=>r.templateId===t.templateId):(state.treasures||[]).find(r=>r.name===t.name)):null;const zoneTxt=foundItem&&foundItem.zone?` · Zona: ${foundItem.zone}`:' · Cualquier zona (más valioso en zonas altas)';return `<button type="button" class="fish-card treasure-catalog-card ${found?'catalog-found':'catalog-unknown'}" data-treasure-catalog="${safeKey}" aria-label="${found?'Ver '+t.name:'Tesoro por descubrir · rareza '+rarityName}"><span class="fish-emoji">${found?t.emoji:'❔'}</span><b>${found?t.name:'????????'}</b><span class="rarity r${rarity}">${found?rarityName:'Por descubrir'}</span><small>${found?(t.passive||'Pieza recuperada en una expedición')+zoneTxt:'Encuentra este tesoro en cualquier zona (más valioso en zonas altas).'}</small></button>`}).join('')||'<div class="empty-state">No hay tesoros que coincidan con la búsqueda.</div>'}
function openTreasureCatalogDetail(key){const [kind,...parts]=String(key||'').split(':');const raw=parts.join(':');let item;if(kind==='relic')item=relicTemplates.find(t=>String(t.templateId)===raw);else item=treasureTypes.find(t=>t.name===raw);if(!item)return;const foundItem=kind==='relic'?(state.relics||[]).find(r=>r.templateId===item.templateId):(state.treasures||[]).find(t=>t.name===item.name);const found=!!foundItem;const rarity=kind==='relic'?(relicRarityIndex[item.rank]??0):(Number.isInteger(item.rarity)?item.rarity:0);if(!found){modal({icon:'❔',eyebrow:'ENCICLOPEDIA DE TESOROS',title:'Por descubrir',desc:'Todavía no has encontrado esta pieza. Aparece en cualquier zona; su valor aumenta en zonas más altas.',stats:[['Estado','Por descubrir'],['Rareza',relicRarity[rarity]||item.rank||'Común'],['Zona','Cualquier zona']],action:'Cerrar'});return}modal({icon:item.emoji,eyebrow:'ENCICLOPEDIA DE TESOROS',title:item.name,desc:item.passive||'Pieza de colección que puedes vender para financiar tu aventura.',stats:[['Estado','Descubierto'],['Rareza',relicRarity[rarity]||item.rank||'Común'],['Valor base',cash(item.value)],['Zona encontrada',foundItem.zone||'Cualquier zona']],action:'Cerrar'})}
function maxTreasureRarityForZone(z){return Math.min(5,Math.max(1,Math.floor(z)+1))} // zona 0: hasta poco común; luego sube
function treasureZoneScale(z){const early=z<=0?0.28:z===1?0.42:z===2?0.58:z===3?0.75:z===4?0.9:1;return early*Math.pow(1.28,Math.max(0,z))}
function findTreasure(){
 if((state.relics||[]).length+(state.treasures||[]).length>=relicCapacity())return null;
 if(Math.random()<.12+(state.zone*0.012)){const relic=findRelic();if(relic)return {...relic,isRelic:true}}
 const tMul=(currentWeather().treasureMul||1)*((activeEvent()&&activeEvent().treasureMul)||1)*(1+boatPassive('treasure')+petBonus('treasure'));
 // menos tesoros al principio
 const chance=Math.min(.42,.12+state.zone*0.035)*tMul;
 if(Math.random()>chance)return null;
 const maxR=maxTreasureRarityForZone(state.zone);
 let pool=treasureTypes.filter(t=>(t.minZone||0)<=state.zone&&(t.rarity||0)<=maxR);
 if(!pool.length)pool=treasureTypes.filter(t=>(t.minZone||0)<=state.zone);
 if(!pool.length)pool=treasureTypes.filter(t=>(t.rarity||0)===0);
 const t=pool[Math.floor(Math.random()*pool.length)];
 const item={...t,id:Date.now()+Math.random(),value:Math.max(20,Math.round(t.value*treasureZoneScale(state.zone))),zone:currentZone().name};
 state.treasures.push(item);return item;
}
const AQUARIUM_SKILLS=Array.from({length:30},(_,index)=>{const rank=Math.floor(index/3)+1,rawType=['space','price','quality'][index%3],type=rawType==='quality'&&Math.floor(index/3)>=5?'price':rawType,qualityRank=type==='quality'?Math.floor(index/3):0,zoneGate=type==='quality'?[1,1,3,5,7][qualityRank]||7:0;const names=type==='space'?['Pecera auxiliar','Tanque reforzado','Acuario panorámico','Depósito de arrecife','Tanque de corrientes','Pecera oceánica','Cúpula marina','Gran tanque abisal','Santuario de especies','Expansión magistral']:type==='price'?['Entradas económicas','Carteles informativos','Visitas guiadas','Iluminación premium','Alimentación selecta','Marketing marino','Experiencia inmersiva','Galería de lujo','Patrocinio oceánico','Marca legendaria']:['Vitrina de poco comunes','Vitrina de raros','Vitrina de épicos','Vitrina de legendarios','Vitrina de míticos','Conservación avanzada','Laboratorio de rarezas','Pabellón de élite','Centro de conservación','Maestría del museo'];const rarityLabel=['Poco común','Raro','Épico','Legendario','Mítico'];return {id:index,type,rank,zoneGate,name:type==='quality'?('Vitrina de '+rarityLabel[Math.min(4,Math.floor(index/3))].toLocaleLowerCase('es')):names[rank-1],unlockLabel:rarityLabel[Math.min(4,Math.floor(index/3))],cost:Math.round(250*Math.pow(1.42,index)),icon:type==='space'?'🫧':type==='price'?'💰':'🔬',percent:type==='price'?4+rank*1.5:type==='quality'?3+rank:0}});
const WAREHOUSE_SKILLS=Array.from({length:15},(_,index)=>{const amount=index<5?2:index<10?3:4;const names=['Estantería básica','Cajones de red','Cámara frigorífica','Pasillo de estiba','Almacén modular','Bodega reforzada','Depósito costero','Cámara industrial','Nave de carga','Almacén portuario','Centro logístico','Silos marinos','Gran depósito','Almacén oceánico','Mega almacén'];return {id:index,name:names[index],amount,cost:Math.round(400*Math.pow(1.55,index)),icon:'📦',desc:`+${amount} espacios de almacén (capacidad total hasta ${Math.min(50,5+Array.from({length:index+1},(_,i)=>i<5?2:i<10?3:4).reduce((a,b)=>a+b,0))}).`}});
function upgradeWarehouse(id){const next=WAREHOUSE_SKILLS.find(n=>!warehouseOwned(n.id));const skill=id===undefined?next:WAREHOUSE_SKILLS[id];if(!skill||warehouseOwned(skill.id)||next?.id!==skill.id)return;if(state.money<skill.cost){toast(`Necesitas ${cash(skill.cost)}`);return}state.money-=skill.cost;state.warehouseUpgrades.push(skill.id);state.warehouseUpgrades.sort((a,b)=>a-b);save();updateTop();renderUpgrades();renderHold();sound('upgrade');toast(`Almacén ampliado: ${warehouseCapacity()}/50 espacios`)}
function openWarehouseUpgradeDetail(id){const skill=WAREHOUSE_SKILLS[id];if(!skill)return;const next=WAREHOUSE_SKILLS.find(n=>!warehouseOwned(n.id)),bought=warehouseOwned(id),ready=next?.id===id;modal({icon:skill.icon,eyebrow:`ALMACÉN · MEJORA ${String(id+1).padStart(2,'0')} DE 15`,title:skill.name,desc:skill.desc,stats:[['Coste',bought?'Comprada':cash(skill.cost)],['Estado',bought?'Desbloqueada':!ready?'Bloqueada':'Disponible'],['Capacidad actual',`${warehouseCapacity()} / 50`],['Tras comprar',bought?'—':`${Math.min(50,warehouseCapacity()+skill.amount)} / 50`]],action:bought?'Cerrar':!ready?'Mejora bloqueada':state.money<skill.cost?'Dinero insuficiente':'Ampliar almacén',onAction:()=>{if(bought||!ready||state.money<skill.cost){hideModal();return}upgradeWarehouse(id);hideModal()}});if(!bought&&(!ready||state.money<skill.cost))$('modal-action').disabled=true;else $('modal-action').disabled=false}
function aquariumOwned(id,owned=state.aquariumUpgrades||[]){return owned.includes(id)}
function aquariumCapacityFor(owned=state.aquariumUpgrades||[]){return Math.min(10,1+owned.filter(id=>Number.isInteger(id)&&id%3===0).length)}
function aquariumCapacity(){return aquariumCapacityFor()}
function aquariumPriceBonus(){return (state.aquariumUpgrades||[]).reduce((sum,id)=>sum+(AQUARIUM_SKILLS[id]?.type==='price'?(AQUARIUM_SKILLS[id].percent/100):0),0)+((state.aquariumUpgrades||[]).includes(27)?.15:0)}
function aquariumQualityBonus(){return (state.aquariumUpgrades||[]).reduce((sum,id)=>sum+(AQUARIUM_SKILLS[id]?.type==='quality'?(AQUARIUM_SKILLS[id].percent/100):0),0)}
function aquariumRarityUnlocked(rarity){if(rarity===0)return true;const idx=Math.max(0,Math.min(4,rarity-1));const node=AQUARIUM_SKILLS.find(n=>n.type==='quality'&&Math.floor(n.id/3)===idx);return !!node&&aquariumOwned(node.id)&&state.unlocked.includes(node.zoneGate)}
function aquariumFishIncome(id){const f=fish[id];if(!f)return 0;const rarityFactor=[.07,.085,.11,.14,.19,.25][f.rarity]||.07;const uniqueFactor=.72+(((id*37)%53)/100);const base=Math.min(f.value*.32,Math.max(2,Math.round(f.value*rarityFactor*uniqueFactor)));const rarityBonus=(state.aquariumUpgrades||[]).reduce((sum,nodeId)=>{const n=AQUARIUM_SKILLS[nodeId];return sum+(n&&n.type==='quality'&&n.rank>=2&&f.rarity>=2?n.percent/100:0)},0);return Math.max(1,Math.min(Math.round(f.value*.65),Math.round(base*(1+aquariumPriceBonus()+aquariumQualityBonus()+rarityBonus+relicBonus('aquarium')))))}
function aquariumDailyIncome(){return (state.aquarium||[]).reduce((sum,id)=>sum+aquariumFishIncome(id),0)}
function aquariumUpgradeCost(){const next=AQUARIUM_SKILLS.find(n=>!aquariumOwned(n.id));return next?next.cost:0}
function upgradeAquarium(id){const next=AQUARIUM_SKILLS.find(n=>!aquariumOwned(n.id));const skill=id===undefined?next:AQUARIUM_SKILLS[id];if(!skill||aquariumOwned(skill.id)||next?.id!==skill.id)return;if(!state.unlocked.includes(skill.zoneGate)){toast(`Desbloquea primero ${zones[skill.zoneGate].name} para esta mejora`);return}if(state.money<skill.cost){toast(`Necesitas ${cash(skill.cost)} para esta mejora`);return}state.money-=skill.cost;state.aquariumUpgrades.push(skill.id);state.aquariumUpgrades.sort((a,b)=>a-b);state.aquariumLevel=aquariumCapacity();save();updateTop();renderAquarium();renderUpgrades();sound('upgrade');toast(`Mejora desbloqueada: ${skill.name}`)}
function renderAquarium(){const query=($('aquarium-search')?.value||'').trim().toLocaleLowerCase('es'),allDiscovered=state.discovered.filter(id=>fish[id]&&fish[id].name.toLocaleLowerCase('es').includes(query)),shown=state.aquarium||[],cap=aquariumCapacity(),income=aquariumDailyIncome();const pages=Math.max(1,Math.ceil(allDiscovered.length/24));aquariumPage=Math.max(0,Math.min(aquariumPage,pages-1));$('aquarium-count').textContent=shown.length;$('aquarium-income').textContent=cash(income);$('aquarium-summary').textContent=`${shown.length}/${cap} peces · +${Math.round(aquariumPriceBonus()*100)}% ingresos`;$('aquarium-capacity').textContent=`${shown.length} / ${cap}`;$('aquarium-income-total').textContent=cash(income)+' / día';$('aquarium-tank').innerHTML=shown.length?shown.map((id,i)=>{const f=fish[id];return `<button type="button" class="tank-fish tank-fish-${i%5}" data-aquarium-info="${id}" title="Ver información de ${f.name}" style="--fish-delay:${i*-1.7}s">${f.emoji}</button>`}).join(''):'<div class="tank-empty"><span>🐠</span><b>Tu pecera está vacía</b><span>Elige un pez descubierto de la colección de abajo.</span></div>';$('aquarium-page-label').textContent=`Página ${aquariumPage+1} / ${pages}`;$('aquarium-prev-page').disabled=aquariumPage===0;$('aquarium-next-page').disabled=aquariumPage>=pages-1;$('aquarium-list').innerHTML=allDiscovered.length?allDiscovered.slice(aquariumPage*24,aquariumPage*24+24).map(id=>{const f=fish[id],isShown=shown.includes(id),full=!isShown&&shown.length>=cap,qualityLocked=!aquariumRarityUnlocked(f.rarity);return `<article class="feature-card aquarium-choice ${isShown?'feature-active':''} ${qualityLocked?'quality-locked':''}"><div class="feature-emoji">${qualityLocked?'🔒':f.emoji}</div><h3>${f.name}</h3><p>${rarities[f.rarity]} · ${f.weight} kg</p><strong>${qualityLocked?'Requiere mejora de museo':'Genera '+cash(aquariumFishIncome(id))+' / día'}</strong>${qualityLocked?`<small>Desbloquea la mejora de calidad para exponer esta rareza.</small>`:`<button class="${isShown?'secondary':'primary'}" data-aquarium="${id}" ${isShown||full?'disabled':''}>${isShown?'En la pecera':full?'Mejora la capacidad':'Añadir a la pecera'}</button>`}</article>`}).join(''):'<div class="empty-state">🐠 Descubre peces en tus expediciones para añadirlos al acuario.</div>'}
function claimDailyMission(id){ensureDailyContent();const m=(state.dailyMissions||[]).find(x=>x.id===id);if(!m||m.claimed||(m.progress||0)<m.goal)return;m.claimed=true;state.money+=m.reward;addCaptainXp(2);addTicket('fish',1);if(Math.random()<0.4)addTicket('treasure',1);save();updateTop();renderMissions();renderGacha();sound('upgrade');showMissionCompleteFx();toast(`Diaria: +${cash(m.reward)} · 🎟️ ficha`);checkAchievements()}
function claimStoryMission(id){
 const m=missionDefs.find(x=>x.id===id);if(!m)return;
 if((state.completedMissions||[]).includes(id))return;
 const n=Math.min(m.goal,m.progress());
 if(n<m.goal)return;
 if(!state.completedMissions)state.completedMissions=[];
 state.completedMissions.push(id);state.money+=m.reward;addCaptainXp(5);addTicket('fish',1);if(m.goal>=20)addTicket('treasure',1);save();updateTop();renderMissions();renderGacha();sound('upgrade');showMissionCompleteFx();toast(`Misión: ${m.title} · +${cash(m.reward)} · 🎟️`);checkAchievements();
}
function setMissionTab(tab){
 missionTab=['story','daily','contracts'].includes(tab)?tab:'story';
 document.querySelectorAll('[data-mission-tab]').forEach(b=>b.classList.toggle('active',b.dataset.missionTab===missionTab));
 ['story','daily','contracts'].forEach(t=>{
  const panel=$('mission-panel-'+t);
  if(panel)panel.classList.toggle('hidden',t!==missionTab);
 });
}
function renderMissions(){
 ensureDailyContent();
 const countdown=formatCountdown(msUntilMidnight());
 if($('daily-countdown'))$('daily-countdown').textContent=countdown;
 if($('daily-reset-label'))$('daily-reset-label').textContent=missionTab==='daily'?'Reinicio a las 00:00 · queda '+countdown:(missionTab==='contracts'?'Siempre 3 contratos activos · al completar aparece otro':'Misiones permanentes de progreso');
 const dailyHtml=(state.dailyMissions||[]).map(m=>{
  const n=Math.min(m.goal,m.progress||0),done=!!m.claimed,ready=n>=m.goal&&!done;
  return `<article class="feature-card"><div class="feature-emoji">${done?'✅':'📅'}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="mission-progress"><span style="width:${Math.min(100,n/m.goal*100)}%"></span></div><small>${done?'Completada':n+' / '+m.goal} · Recompensa ${cash(m.reward)}</small><button class="${ready?'primary':'secondary'}" data-daily="${m.id}" ${!ready?'disabled':''}>${done?'Completada':ready?'Cobrar recompensa':'En progreso'}</button></article>`;
 }).join('')||'<div class="empty-state">No hay misiones diarias.</div>';
 if($('daily-mission-list'))$('daily-mission-list').innerHTML=dailyHtml;
 const contractHtml=(state.contracts||[]).filter(c=>!c.claimed).map(c=>{
  const have=warehouseCountByBase(c.base),ready=have>=c.qty;
  return `<article class="feature-card"><div class="feature-emoji">${c.emoji||'📦'}</div><h3>Entregar ${c.qty}× ${c.name}</h3><p>Zona: ${c.zoneName}. Guarda los peces en el almacén de la bodega y entrégalos aquí.</p><div class="mission-progress"><span style="width:${Math.min(100,have/c.qty*100)}%"></span></div><small>${have+' / '+c.qty+' en almacén'} · Recompensa ${cash(c.reward)}</small><button class="${ready?'primary':'secondary'}" data-deliver="${c.id}" ${!ready?'disabled':''}>${ready?'Entregar':'Faltan peces'}</button></article>`;
 }).join('')||'<div class="empty-state">No hay contratos activos.</div>';
 if($('contract-list'))$('contract-list').innerHTML=contractHtml;
 const completed=new Set(state.completedMissions||[]);
 const storyHtml=missionDefs.map(m=>{
  const raw=m.progress(),n=Math.min(m.goal,raw),done=completed.has(m.id),ready=n>=m.goal&&!done;
  const label=m.goal>=1000?cash(n)+' / '+cash(m.goal):(n+' / '+m.goal);
  return `<article class="feature-card"><div class="feature-emoji">${done?'✅':(m.icon||'📜')}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="mission-progress"><span style="width:${Math.min(100,n/m.goal*100)}%"></span></div><small>${done?'Completada':label} · Recompensa ${cash(m.reward)}</small><button class="${ready?'primary':'secondary'}" data-story="${m.id}" ${!ready?'disabled':''}>${done?'Completada':ready?'Cobrar recompensa':'En progreso'}</button></article>`;
 }).join('');
 ensureWeeklyContent();
 const weeklyHtml=(state.weeklyMissions||[]).map(m=>{
  const n=Math.min(m.goal,m.progress||0),done=!!m.claimed,ready=n>=m.goal&&!done;
  return `<article class="feature-card"><div class="feature-emoji">${done?'✅':'📅'}</div><h3>Semanal · ${m.title}</h3><p>${m.desc}</p><div class="mission-progress"><span style="width:${Math.min(100,n/m.goal*100)}%"></span></div><small>${done?'Completada':n+' / '+m.goal} · ${cash(m.reward)}</small><button class="${ready?'primary':'secondary'}" data-weekly="${m.id}" ${!ready?'disabled':''}>${done?'Completada':ready?'Cobrar':'En progreso'}</button></article>`;
 }).join('');
 if($('story-mission-list'))$('story-mission-list').innerHTML=weeklyHtml+storyHtml;
 if($('mission-list'))$('mission-list').innerHTML='';
 setMissionTab(missionTab);
}
function claimMission(id){claimStoryMission(id)}
function dailyWorld(){
 const w=currentWeather(),s=currentSeason(),ev=activeEvent();
 const badge=document.querySelector('.weather-badge');
 if(badge){
  badge.innerHTML=`${w.emoji} <span>${w.name} · ${s.name}</span>`;
  badge.title='Pulsa para ver clima, estación y evento';
  badge.setAttribute('role','button');
  badge.tabIndex=0;
 }
 const tip=document.querySelector('.daily-tip');
 if(tip){const r=captainRank();tip.innerHTML=`💡 <b>${r.emoji} ${r.name}:</b> vende capturas, guarda peces en el almacén y completa contratos.`;}
 const expEv=$('expedition-event');
 if(expEv){
  if(ev){expEv.classList.remove('hidden');expEv.innerHTML=`${ev.emoji} <b>${ev.name}</b> — ${ev.desc} <small>(${ev.dayLeft}d)</small>`}
  else {expEv.classList.add('hidden');expEv.innerHTML=''}
 }
 const banner=$('event-banner');if(banner)banner.classList.add('hidden');
 if(ev)state._playedEvent=true;
}
function openWeatherInfo(){
 const w=currentWeather(),s=currentSeason(),ev=activeEvent();
 let desc=`${w.emoji} ${w.name}: ${w.desc}\n${s.emoji} ${s.name}: ${s.desc}`;
 if(ev)desc+=`\n${ev.emoji} ${ev.name}: ${ev.desc} (${ev.dayLeft}d)`;
 else desc+='\nSin evento especial activo.';
 modal({icon:w.emoji,eyebrow:'CONDICIONES DEL MAR',title:`${w.name} · ${s.name}`,desc,stats:[],action:'Entendido'});
}
function renderSettings(){$('sound-toggle').textContent=state.sound?'Efectos: ON':'Efectos: OFF';$('sound-toggle').classList.toggle('on',state.sound);$('sound-toggle').setAttribute('aria-pressed',String(state.sound));const me=state.musicEnabled!==false;if($('music-toggle')){$('music-toggle').textContent=me?'Música: ON':'Música: OFF';$('music-toggle').classList.toggle('on',me);$('music-toggle').setAttribute('aria-pressed',String(me))}$('music-volume').value=state.musicVolume;$('music-volume-value').textContent=state.musicVolume+' %';$('effects-volume').value=state.effectsVolume;$('effects-volume-value').textContent=state.effectsVolume+' %';syncMusicVolume();$('install-app').disabled=!installPrompt}
function toast(message){$('sea-message').textContent=message;$('sea-message').classList.remove('hidden');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{if(sessionActive)$('sea-message').textContent='A / D para moverte · E para pescar'},1800)}
function pickFish(){const z=currentZone(),maxSpecies=Math.min(fish.length,baseFish.length*(state.zone+1)*2);let possible=fish.filter(f=>z.pool.includes(f.base)&&f.id<maxSpecies);const ev=activeEvent();if(ev&&ev.poolBoost&&ev.poolBoost.length){const boosted=fish.filter(f=>ev.poolBoost.includes(f.base)&&f.id<maxSpecies);if(boosted.length)possible=possible.concat(boosted)}const bait=BAITS.find(b=>b.id===state.activeBait);if(bait&&bait.boostBases){const extra=fish.filter(f=>bait.boostBases.includes(f.base)&&f.id<maxSpecies);possible=possible.concat(extra)}const boss=currentBoss();const bk=bossKey();if(boss&&!(state.bossDefeated||[]).includes(bk)&&Math.random()<(.045+(state.isNight?0.04:0))){const bf=fish.find(f=>f.base===boss.base)||fish[Math.min(fish.length-1,boss.base)];if(bf)return {...bf,name:boss.name,emoji:boss.emoji,_boss:true,_bossHp:state.bossHp?.[bk]??boss.hp}}
if(ev&&EVENT_LEGENDARIES[ev.id]&&Math.random()<0.035){const el=EVENT_LEGENDARIES[ev.id];const bf=fish.find(f=>f.base===el.base&&f.rarity>=4)||fish.find(f=>f.base===el.base);if(bf)return {...bf,name:el.name,emoji:el.emoji,rarity:5,_event:true,value:Math.round((bf.value||500)*4)}}const maxFishR=Math.min(5,Math.max(0,state.zone)+(state.isNight?1:0));const rareBonus=SKILLS.filter(n=>n.branch==='rod'&&n.effect==='rare'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0)+boatPassive('rare')+petBonus('rare')+(currentBoat().passives?.zoneBonus?.includes(state.zone)?0.08:0);const baseW=[68,22,7.5,2,.45,.05];const w=currentWeather(),s=currentSeason();const weights=possible.map(f=>{let wt=baseW[f.rarity]||1;if(f.rarity>maxFishR)wt*=0.25;else if(f.rarity===maxFishR&&state.zone<=1)wt*=0.55;if(f.rarity>=2)wt*=1+(rareBonus+relicBonus('rare'))*7;if(f.rarity>=4)wt*=1+rareBonus*12;if(f.rarity<=1)wt*=(w.commonMul||1)*(s.commonMul||1)*(bait?.commonMul||1);if(f.rarity>=2)wt*=(w.rareMul||1)*(s.rareMul||1)*(ev&&ev.rareMul||1)*(bait?.rareMul||1);if((w.depthBoost||s.depthBoost||(bait&&bait.deepMul>1))&&f.depth>250)wt*=1.35*(bait?.deepMul||1);if(w.speedBoost&&f.speed>1.1)wt*=1.3;if(ev&&ev.poolBoost&&ev.poolBoost.includes(f.base))wt*=2.2;if(bait&&bait.boostBases&&bait.boostBases.includes(f.base))wt*=2.5;if(state.isNight){if(f.rarity>=2)wt*=1.25*(bait?.nightBonus||1);if(f.depth>200)wt*=1.2}return wt});let total=weights.reduce((a,b)=>a+b,0),r=Math.random()*total;for(let k=0;k<possible.length;k++){r-=weights[k];if(r<=0)return possible[k]}return possible[0]||fish[0]}
function desiredActorCount(){const extra=SKILLS.filter(n=>n.branch==='boat'&&n.effect==='spawn'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount,0);return 3+extra}
function spawnActor(){const f=pickFish();return {f,x:65+Math.random()*830,y:235+Math.random()*235,dir:Math.random()>.5?1:-1,speed:13+Math.random()*24,phase:Math.random()*6.28,scale:.68+Math.random()*.42,depth:Math.random()}}
function ensureActors(){const target=desiredActorCount();while(actors.length<target)actors.push(spawnActor());if(actors.length>target)actors.length=target}
function initActors(){actors=[];ensureActors()}
function startFishing(){if(sessionActive)return;sessionActive=true;if(!state.stats)state.stats={};state.stats.sessionStart=Date.now();timer=sessionDuration();state._sessionCaught=0;cast=null;castCooldown=0;initActors();showScreen('fishing');$('fishing-zone-title').textContent=currentZone().name;$('fishing-zone-label').textContent=(state.isNight?'🌙 NOCTURNA · ':'EXPEDICIÓN · ')+'DÍA '+state.day;$('timer').innerHTML=`${timer}<span>s</span>`;$('sea-message').textContent='A / D para moverte · E para pescar';$('cast-label').textContent='Lanzar caña';$('cast-button').disabled=false;updateBaitHud();lastFrame=0;sound('cast');if(!raf)raf=requestAnimationFrame(frame);else lastFrame=0}

function checkSecretZone(){
 const ev=activeEvent();
 const hasExplore=(state.achievements||[]).includes('explorer')||(state.unlocked||[]).length>=5;
 if(ev&&ev.secret&&hasExplore&&!(state.unlocked||[]).includes(10)){
  state.unlocked.push(10);toast('🌀 ¡Zona Secreta desbloqueada!');showMissionCompleteFx();
 }
}
function buyBait(id){
 const b=BAITS.find(x=>x.id===id);if(!b)return;
 if(state.money<b.cost){toast('No te alcanza');return}
 state.money-=b.cost;if(!state.baits)state.baits={};state.baits[id]=(state.baits[id]||0)+1;save();updateTop();renderBaitShop();toast(`Comprado: ${b.name}`);
}
function equipBait(id){
 if(id&&!(state.baits&&state.baits[id]>0)){toast('No tienes ese cebo');return}
 state.activeBait=id||null;save();renderBaitShop();toast(id?`Cebo equipado: ${BAITS.find(b=>b.id===id).name}`:'Cebo quitado');
}
function updateBaitHud(){
 const hud=$('bait-hud');if(!hud)return;
 const b=BAITS.find(x=>x.id===state.activeBait);
 if(b){hud.classList.remove('hidden');hud.textContent=`${b.emoji} ${b.name}`}
 else {hud.classList.add('hidden');hud.textContent=''}
}
function renderBaitShop(){
 const root=$('bait-list');if(!root)return;
 const active=BAITS.find(b=>b.id===state.activeBait);
 const sum=$('bait-summary');if(sum)sum.textContent=active?`${active.emoji} ${active.name}`:'Sin cebo equipado';
 root.innerHTML=BAITS.map(b=>{
  const qty=state.baits?.[b.id]||0;const on=state.activeBait===b.id;
  return `<article class="feature-card ${on?'feature-active':''}"><div class="feature-emoji">${b.emoji}</div><h3>${b.name}</h3><p>${b.desc}</p><small>Tienes: ${qty} · ${cash(b.cost)}</small><div class="hold-actions"><button class="secondary" data-buy-bait="${b.id}">Comprar</button><button class="${on?'secondary':'primary'}" data-equip-bait="${b.id}" ${qty<1&&!on?'disabled':''}>${on?'Equipado':'Equipar'}</button></div></article>`;
 }).join('')+`<article class="feature-card"><div class="feature-emoji">🚫</div><h3>Sin cebo</h3><p>Pesca normal sin sesgo.</p><button class="secondary" data-equip-bait="">Quitar cebo</button></article>`;
}

function unlockedEventZoneIds(){
 const maxZ=Math.max(0,...(state.unlocked||[0]));
 return EVENT_ZONES.filter(z=>maxZ>=z.unlockAt||(state.unlockedEventZones||[]).includes(z.id)).map(z=>z.id);
}
function ensureEventZones(){
 if(!state.unlockedEventZones)state.unlockedEventZones=[];
 const maxZ=Math.max(0,...(state.unlocked||[0]));
 EVENT_ZONES.forEach(z=>{if(maxZ>=z.unlockAt&&!state.unlockedEventZones.includes(z.id))state.unlockedEventZones.push(z.id)});
}
function addTicket(type,n=1){
 if(!state.gachaTickets)state.gachaTickets={fish:0,event:0,treasure:0};
 state.gachaTickets[type]=(state.gachaTickets[type]||0)+n;
}
function ticketCount(type){return (state.gachaTickets&&state.gachaTickets[type])||0}

function openGacha(type){
 type=['fish','event','treasure'].includes(type)?type:'fish';
 const cost=1;
 const have=ticketCount(type);
 if(type==='event'&&!unlockedEventZoneIds().length){toast('Desbloquea al menos una zona de evento en el mapa');return}if(have<cost){toast('No tienes fichas de este gachapón');return}
 const labels={fish:['🐟','Gachapón de peces','Pool de todas tus zonas desbloqueadas'],event:['🎉','Gachapón de evento','Solo peces de zonas de evento desbloqueadas'],treasure:['🗝️','Gachapón de tesoros','Tesoros de zonas que ya exploraste']};
 const L=labels[type];
 modal({icon:L[0],eyebrow:'GACHAPÓN',title:`¿Usar 1 ficha?`,desc:`${L[1]} — ${L[2]}. Tienes ${have} ficha(s).`,stats:[['Fichas',String(have)],['Coste','1']],action:'¡Girar!',onAction:()=>{hideModal();executeGacha(type)}});
}
function gachaRarityRoll(){
 const r=Math.random();
 if(r<.55)return 0;if(r<.82)return 1;if(r<.94)return 2;if(r<.985)return 3;if(r<.997)return 4;return 5;
}
function executeGacha(type){
 if(ticketCount(type)<1){toast('Sin fichas');return}
 addTicket(type,-1);
 let result=null,kind=type;
 if(type==='fish'){
  const unlocked=state.unlocked||[0];
  const pool=fish.filter(f=>!f.event&&unlocked.some(z=>z>=(f.minZone||0)));
  const want=gachaRarityRoll();
  let candidates=pool.filter(f=>f.rarity===want);
  if(!candidates.length)candidates=pool;
  result=candidates[Math.floor(Math.random()*candidates.length)]||fish[0];
  if(!state.warehouse)state.warehouse=[];
  if(state.warehouse.length>=warehouseCapacity()){
   if(state.hold.length<capacity())state.hold.push(result.id);
   else{addTicket('fish',1);toast('Almacén y bodega llenos');return}
  } else state.warehouse.push(result.id);
  if(!state.discovered.includes(result.id))state.discovered.push(result.id);
 } else if(type==='event'){
  ensureEventZones();
  const ids=unlockedEventZoneIds();
  if(!ids.length){addTicket('event',1);toast('Desbloquea zonas de evento primero');return}
  const pool=fish.filter(f=>f.event&&ids.includes(f.eventZone));
  const want=gachaRarityRoll();
  let candidates=pool.filter(f=>f.rarity===want);
  if(!candidates.length)candidates=pool;
  result=candidates[Math.floor(Math.random()*candidates.length)];
  if(!result){addTicket('event',1);toast('Pool de evento vacío');return}
  if(!state.warehouse)state.warehouse=[];
  if(state.warehouse.length>=warehouseCapacity()){
   if(state.hold.length<capacity())state.hold.push(result.id);
   else{addTicket('event',1);toast('Almacén y bodega llenos');return}
  } else state.warehouse.push(result.id);
  if(!state.discovered.includes(result.id))state.discovered.push(result.id);
 } else {
  // treasure
  const maxZ=Math.max(0,...(state.unlocked||[0]));
  const pool=treasureTypes.filter(t=>(t.minZone||0)<=maxZ);
  const want=gachaRarityRoll();
  let candidates=pool.filter(t=>(t.rarity||0)===want);
  if(!candidates.length)candidates=pool;
  const t=candidates[Math.floor(Math.random()*candidates.length)]||treasureTypes[0];
  result={...t,id:'tg-'+Date.now()+Math.random(),value:Math.max(20,Math.round(t.value*treasureZoneScale(maxZ))),zone:zones[Math.min(maxZ,zones.length-1)].name,_treasure:true};
  if(!state.treasures)state.treasures=[];
  state.treasures.push(result);
 }
 state.stats=state.stats||{};state.stats.gachaOpens=(state.stats.gachaOpens||0)+1;
 trackWeekly('gachaOpens',1);
 save();playGachaAnim(result,type);renderGacha();renderHold();renderTreasures();updateTop();checkAchievements();
}
function playGachaAnim(f,type){
 const el=$('gacha-anim');if(!el)return;
 const r=f.rarity||0;
 const rName=rarities[r]||'Común';
 el.classList.remove('hidden','gacha-r0','gacha-r1','gacha-r2','gacha-r3','gacha-r4','gacha-r5');
 el.classList.add('gacha-spin','gacha-r'+Math.min(5,r));
 $('gacha-anim-emoji').textContent='❓';
 $('gacha-anim-name').textContent='Girando…';
 const sub=$('gacha-anim-rarity');if(sub)sub.textContent='';
 setTimeout(()=>{
  $('gacha-anim-emoji').textContent=f.emoji||'🎁';
  $('gacha-anim-name').textContent=f.name;
  if(sub)sub.textContent=rName+(f._treasure?' · Tesoro':(f.event?' · Evento':''));
  el.classList.remove('gacha-spin');el.classList.add('gacha-reveal');
  sound(r>=4?'upgrade':r>=2?'catch':'sell');
  setTimeout(()=>{el.classList.add('hidden');el.classList.remove('gacha-reveal','gacha-r0','gacha-r1','gacha-r2','gacha-r3','gacha-r4','gacha-r5');
   toast(`${f.emoji||'🎁'} ${f.name} (${rName})`);
  },1600);
 },1100);
}
function renderGacha(){
 ensureEventZones();
 const root=$('gacha-list');if(!root)return;
 const tab=window._gachaTab||'fish';
 document.querySelectorAll('[data-gacha-tab]').forEach(b=>b.classList.toggle('active',b.dataset.gachaTab===tab));
 const tickets=state.gachaTickets||{fish:0,event:0,treasure:0};
 const rarityRow=`<div class="gacha-rarity-row">
  <span class="gr gr0">Común</span><span class="gr gr1">Poco común</span><span class="gr gr2">Raro</span>
  <span class="gr gr3">Épico</span><span class="gr gr4">Legendario</span><span class="gr gr5">Mítico</span>
 </div>`;
 const rates=`<div class="gacha-rates-bar"><span>55%</span><span>27%</span><span>12%</span><span>4.5%</span><span>1.2%</span><span>0.3%</span></div>`;

 if(tab==='fish'){
  const nZones=(state.unlocked||[]).length;
  const n=tickets.fish||0;
  root.innerHTML=`<article class="gacha-hero fish-machine">
   <div class="gacha-hero-banner"><img class="gacha-hero-banner-img" src="./assets/gacha-fish.jpg" alt="Gachapón de peces" decoding="async"></div>
   <div class="gacha-hero-body">
    <p class="gacha-kicker">OCEAN TREASURES GACHA</p>
    <h2>¡Gachapón de peces!</h2>
    <p class="gacha-lead">Gira y colecciona peces raros de tus <b>${nZones}</b> zonas desbloqueadas. Van al almacén.</p>
    ${rarityRow}${rates}
    <div class="gacha-globe" aria-hidden="true"><span>🐟</span><span>🐠</span><span>🐡</span><span>🦈</span><span>🦑</span></div>
    <div class="gacha-ticket-pill">🎟️ ${n} ficha${n===1?'':'s'} de peces</div>
    <button class="gacha-cta" data-open-gacha="fish" ${n<1?'disabled':''}>¡GIRA AHORA!</button>
    <p class="gacha-footnote">1 ficha por giro · Cuantas más zonas, más especies posibles</p>
   </div>
  </article>`;
 } else if(tab==='event'){
  const ids=unlockedEventZoneIds();
  const n=tickets.event||0;
  root.innerHTML=`<article class="gacha-hero event-machine">
   <div class="gacha-hero-banner"><img class="gacha-hero-banner-img" src="./assets/gacha-event.jpg" alt="Gachapón de evento" decoding="async"></div>
   <div class="gacha-hero-body">
    <p class="gacha-kicker">EVENTO LIMITADO</p>
    <h2>¡Gachapón de evento!</h2>
    <p class="gacha-lead">Peces exclusivos de zonas de evento (<b>${ids.length}</b> desbloqueadas). Se abren al progresar en el mapa.</p>
    ${rarityRow}${rates}
    <div class="gacha-globe event" aria-hidden="true"><span>🎉</span><span>💎</span><span>🌑</span><span>👻</span><span>🌀</span></div>
    <div class="gacha-ticket-pill">🎟️ ${n} ficha${n===1?'':'s'} de evento</div>
    <button class="gacha-cta event" data-open-gacha="event" ${n<1||!ids.length?'disabled':''}>¡GIRA EVENTO!</button>
    <p class="gacha-footnote">${ids.length? 'Pool activa según tus zonas de evento':'Desbloquea zonas de evento en el mapa para girar'}</p>
   </div>
  </article>`;
 } else {
  const maxZ=Math.max(0,...(state.unlocked||[0]));
  const n=tickets.treasure||0;
  root.innerHTML=`<article class="gacha-hero treasure-machine">
   <div class="gacha-hero-banner"><img class="gacha-hero-banner-img" src="./assets/gacha-treasure.jpg" alt="Gachapón de tesoros" decoding="async"></div>
   <div class="gacha-hero-body">
    <p class="gacha-kicker">RELIQUIAS DEL MAR</p>
    <h2>¡Gachapón de tesoros!</h2>
    <p class="gacha-lead">Reliquias según tu progreso (hasta zona <b>${maxZ+1}</b>). Van a tu colección de tesoros.</p>
    ${rarityRow}${rates}
    <div class="gacha-globe treasure" aria-hidden="true"><span>🗝️</span><span>👑</span><span>💎</span><span>🧭</span><span>🪙</span></div>
    <div class="gacha-ticket-pill">🎟️ ${n} ficha${n===1?'':'s'} de tesoro</div>
    <button class="gacha-cta treasure" data-open-gacha="treasure" ${n<1?'disabled':''}>¡GIRA TESORO!</button>
    <p class="gacha-footnote">Más zonas desbloqueadas = mejores reliquias posibles</p>
   </div>
  </article>`;
 }
}

function renderStats(){
 pushLogbookWeekly();
 const s=state.stats||{};
 const zc=s.zoneCatches||{};
 let favZ=0,favN=0;Object.entries(zc).forEach(([z,n])=>{if(n>favN){favN=n;favZ=Number(z)}});
 const mv=s.mostValuable;
 const el=$('stats-panel');if(!el)return;
 const playMin=Math.floor((s.playSeconds||0)/60);
 const rank=captainRank();
 const rec=state.records||{};
 const heavy=rec.heaviest, best=rec.mostValuable;
 const masteryRows=zones.map((z,zi)=>{
  const n=zoneMasteryLevel(zi);
  const bonus=Math.floor(n/100)*5;
  return `<div class="mastery-row"><span>${z.emoji} ${z.name}</span><span>${n} capturas · +${bonus}%</span><div class="mastery-bar"><i style="width:${Math.min(100,n%100)}%"></i></div></div>`;
 }).join('');
 const log=(state.logbook||[]).slice(0,5).map(e=>`<li>Semana · Día ${e.day}: ${e.caught} capturas · Mejor: ${e.best} · ${e.rank}</li>`).join('')||'<li>Aún no hay entradas de bitácora</li>';
 const pet=BOAT_PETS.find(p=>p.id===state.boatPet);
 el.innerHTML=`
 <div class="wallet-panel captain-rank-card" style="border-color:${rank.color}">
  <div><small>Rango de capitán</small><h2>${rank.emoji} ${rank.name}</h2><p>XP ${captainXp()} · Siguiente: ${CAPTAIN_RANKS.find(r=>r.xp>captainXp())?.name||'Máximo'}</p></div>
 </div>
 <div class="stats-grid">
  <div class="stat-card"><small>Tiempo</small><b>${playMin} min</b></div>
  <div class="stat-card"><small>Capturas</small><b>${state.totalCaught||0}</b></div>
  <div class="stat-card"><small>Ventas</small><b>${cash(state.totalSales||0)}</b></div>
  <div class="stat-card"><small>Racha piques</small><b>${rec.bestBiteStreak||0}</b></div>
 </div>
 <h3 class="section-title">🏛️ Museo de récords</h3>
 <div class="records-row">
  <article class="record-card"><span>${heavy?heavy.emoji:'❔'}</span><b>Más pesado</b><small>${heavy?heavy.name+' · '+heavy.weight+' kg':'—'}</small></article>
  <article class="record-card"><span>${best?best.emoji:'❔'}</span><b>Más valioso</b><small>${best?best.name+' · '+cash(best.value):'—'}</small></article>
  <article class="record-card"><span>🎯</span><b>Mejor racha</b><small>${rec.bestBiteStreak||0} piques</small></article>
  <article class="record-card"><span>${zones[favZ]?.emoji||'🗺️'}</span><b>Zona favorita</b><small>${zones[favZ]?.name||'—'} (${favN})</small></article>
 </div>
 <h3 class="section-title">🏅 Maestría por zona</h3>
 <div class="mastery-list">${masteryRows}</div>
 <h3 class="section-title">🐾 Mascota del barco</h3>
 <div class="pet-picker">${BOAT_PETS.map(p=>`<button class="pet-card ${state.boatPet===p.id?'active':''}" data-pet="${p.id}"><span>${p.emoji}</span><b>${p.name}</b><small>${p.desc}</small></button>`).join('')}</div>
 <p class="gacha-footnote">${pet?'Activa: '+pet.emoji+' '+pet.name:'Elige una mascota para obtener un buff pasivo.'}</p>
 <h3 class="section-title">📖 Bitácora semanal</h3>
 <ul class="logbook-list">${log}</ul>
 <h3 class="section-title">🎁 Código de regalo</h3>
 <div class="gift-row"><input id="gift-code-input" placeholder="Introduce tu código" maxlength="24" autocomplete="off" autocapitalize="characters"><button class="primary" id="gift-code-btn">Canjear</button></div>
 `;
}

function endFishing(){if(!sessionActive&&!reelGame)return;sessionActive=false;reelGame=null;const rp=$('reel-minigame');if(rp)rp.classList.add('hidden');cast=null;const treasure=findTreasure();state.money+=aquariumDailyIncome();
 // zone coin chance
 if(!state.zoneCoins)state.zoneCoins={};
 const zCoin=Math.min(9,state.zone);
 if(Math.random()<0.22+(state.isNight?0.08:0)){state.zoneCoins[zCoin]=(state.zoneCoins[zCoin]||0)+1;toast(`${ZONE_COINS[zCoin].emoji} +1 ${ZONE_COINS[zCoin].name}`);}
 if(state.activeBait&&Math.random()<0.55){state.baits[state.activeBait]=Math.max(0,(state.baits[state.activeBait]||0)-1);if((state.baits[state.activeBait]||0)<=0)state.activeBait=null;}
 const wasNight=state.isNight;state.isNight=false;
 if(wasNight)trackWeekly('nightTrips',1);
 if(!wasNight)state.day++;
 trackDaily('zoneTrip',1);checkSecretZone();checkAchievements();save();updateTop();renderTreasures();dailyWorld();showScreen('menu');const n=state._sessionCaught||0;state._sessionCaught=0;renderMissions();modal({icon:treasure?'🗝️':'🌅',eyebrow:treasure?'¡HALLAZGO EN EL NAUFRAGIO!':'EXPEDICIÓN COMPLETADA',title:treasure?`¡Has encontrado ${treasure.name}!`:'¡De vuelta al puerto!',desc:(n?`Has regresado con ${n} ${n===1?'captura':'capturas'}. `:'')+(treasure?`Entre los restos de un naufragio has recuperado ${treasure.name}, valorado en ${cash(treasure.value)}. `:'')+'Puedes vender capturas y tesoros, equipar tesoros para obtener habilidades pasivas y preparar otra salida.',stats:[['Capturas',String(n)],['Bodega',`${state.hold.length}/${capacity()}`],...(treasure?[['Tesoro',cash(treasure.value)]]:[])],action:'Continuar al puerto',onAction:()=>{hideModal();renderMenu()}})}

let reelGame=null;
function startReelMinigame(f){
 if(reelGame)return;
 sessionActive=false;keys.left=false;keys.right=false;
 const rodBonus=SKILLS.filter(n=>n.branch==='rod'&&hasSkill(n.id)).length*0.012;
 const windowSize=Math.min(.42,.16+rodBonus+Math.random()*.06)-(f.rarity>=4?0.04:0)-(f._boss?0.05:0);
 const win=Math.max(.10,windowSize);
 const target=0.30+Math.random()*0.40;
 const speed=1.05+(f.rarity||0)*.18+(f._boss?0.45:0)+(f.rarity>=5?0.25:0)-rodBonus*0.8;
 reelGame={f,t:0,pos:0,dir:1,speed:Math.max(.85,speed),target,window:win,resolved:false};
 const panel=$('reel-minigame');
 if(panel){panel.classList.remove('hidden');$('reel-fish-name').textContent=(f._boss?'⚔️ JEFE · ':'')+(f._event?'✨ EVENTO · ':'')+f.name;$('reel-fish-emoji').textContent=f.emoji}
}
function resolveReel(success){
 if(!reelGame||reelGame.resolved)return;
 reelGame.resolved=true;
 const f=reelGame.f;
 const panel=$('reel-minigame');if(panel)panel.classList.add('hidden');
 if(success){
  if(!state.stats)state.stats={bitesWon:0,bitesLost:0};
  state.stats.bitesWon=(state.stats.bitesWon||0)+1;
  if(f._boss){
   const boss=currentBoss();
   if(boss){
    if(!state.bossHp)state.bossHp={};
    const key=bossKey();
    const hp=(state.bossHp[key]??boss.hp)-1;
    state.bossHp[key]=hp;
    trackWeekly('bossHits',1);
    if(hp<=0){
     state.bossDefeated=state.bossDefeated||[];
     if(!state.bossDefeated.includes(key))state.bossDefeated.push(key);
     state.money+=boss.reward;toast(`¡${boss.name} derrotado! +${cash(boss.reward)}`);
     trackWeekly('bossKills',1);
     showMissionCompleteFx();
    } else toast(`${boss.emoji} ${boss.name}: ${hp}/${boss.hp} golpes`);
   }
  }
  if(f._event){state.eventFishCaught=state.eventFishCaught||[];if(!state.eventFishCaught.includes(f.name))state.eventFishCaught.push(f.name)}
  cast={phase:'bite',t:0,target:{f},hit:true,x:0,y:0};
  caught(f);
 } else {
  state.stats=state.stats||{};state.stats.bitesLost=(state.stats.bitesLost||0)+1;if(state.records)state.records.currentBiteStreak=0;
  cast=null;castCooldown=.5;$('cast-label').textContent='Lanzar caña';
  $('sea-message').textContent='Se escapó… ¡Inténtalo de nuevo!';
  toast('El pez se ha escapado');
  sessionActive=true;lastFrame=0;startLoop();
 }
 reelGame=null;save();
}
function tryReelHook(){
 if(!reelGame||reelGame.resolved)return;
 const g=reelGame;
 const inZone=Math.abs(g.pos-g.target)<=g.window/2;
 resolveReel(inZone);
}
function updateReelMinigame(dt){
 if(!reelGame||reelGame.resolved)return;
 const g=reelGame;
 g.pos+=g.dir*g.speed*dt;
 if(g.pos>=1){g.pos=1;g.dir=-1}if(g.pos<=0){g.pos=0;g.dir=1}
 const needle=$('reel-needle'),zone=$('reel-zone');
 if(needle)needle.style.left=(g.pos*100)+'%';
 if(zone){zone.style.left=((g.target-g.window/2)*100)+'%';zone.style.width=(g.window*100)+'%'}
 g.t+=dt;if(g.t>4.5)resolveReel(false);
}

function castLine(){if(!sessionActive||cast||castCooldown>0)return;if(state.hold.length>=capacity()){toast('¡Bodega llena! Vende tus capturas en el puerto.');return}const bx=100+(boatPosition*(canvas.width-200));cast={t:0,x:bx+12,y:205,phase:'cast',target:null,hit:false};castCooldown=.35;$('cast-label').textContent='Línea en el agua…';$('sea-message').textContent='La caña desciende: ¡el primer pez que toque será tu captura!';sound('cast')}
function caught(f){if(!cast&&!reelGame)return;if(state.hold.length>=capacity()){cast=null;toast('¡Bodega llena!');sessionActive=true;return}state.hold.push(f.id);if(!state.discovered.includes(f.id))state.discovered.push(f.id);state.totalCaught++;state._sessionCaught=(state._sessionCaught||0)+1;addZoneCatch(state.zone||0);addCaptainXp(1+(f.rarity||0));updateRecordsOnCatch(f);if(!state.records)state.records={};state.records.currentBiteStreak=(state.records.currentBiteStreak||0)+1;if(state.records.currentBiteStreak>(state.records.bestBiteStreak||0))state.records.bestBiteStreak=state.records.currentBiteStreak;trackDaily('sessionCaught',1);if(f.rarity>=2)trackDaily('rareCaught',1);if(currentWeather().id==='storm')state._caughtInStorm=true;const bx=100+(boatPosition*(canvas.width-200)),by=190;spawnCatchParticles(bx,by,f.rarity);checkAchievements();cast=null;castCooldown=.5;$('cast-label').textContent='Lanzar caña';$('bite-flash').classList.remove('hidden');$('bite-flash').textContent='¡CAPTURA!';ensureActors();sound('catch'+Math.min(5,f.rarity||0));save();updateTop();if(activeScreen==='fishing'&&expeditionPausedForHold)renderExpeditionHold();renderCatchModal(f)}
function renderCatchModal(f){const value=price(f);sessionActive=false;keys.left=false;keys.right=false;const rarity=rarities[f.rarity],boss=f.rarity===5;modal({icon:f.emoji,eyebrow:boss?'¡JEFE MARINO LEGENDARIO!':'¡NUEVA CAPTURA!',title:boss?`¡Encuentro mítico: ${f.name}!`:f.name,desc:boss?`Has logrado capturar una criatura mítica de ${currentZone().name}. Este encuentro extraordinario cuenta como una victoria contra un jefe marino y queda registrado en tu enciclopedia.`:`Has pescado un ejemplar de rareza ${rarity}. La expedición queda pausada mientras admiras tu captura.`,stats:[['Rareza',rarity],['Peso',f.weight+' kg'],['Valor',cash(value)]],action:'Continuar pescando',onAction:()=>{hideModal();$('bite-flash').classList.add('hidden');$('sea-message').textContent=`${f.emoji} ${f.name} · ${cash(value)} · ¡Sigue pescando!`;sessionActive=true;lastFrame=0;startLoop()}})}
const canvas=$('sea'),ctx=canvas.getContext('2d');function roundedRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function drawFish(a,t){ctx.save();ctx.translate(a.x,a.y+Math.sin(t*.0017+a.phase)*5);ctx.scale(a.dir*a.scale,a.scale);const col=rColors[a.f.rarity];ctx.globalAlpha=.95;ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(0,0,15,8,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(-23,-8);ctx.lineTo(-22,8);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(-1,-6);ctx.lineTo(4,-13);ctx.lineTo(7,-5);ctx.fill();ctx.fillStyle='#06243b';ctx.beginPath();ctx.arc(8,-2,1.5,0,Math.PI*2);ctx.fill();if(a.f.rarity>=4){ctx.globalAlpha=.25;ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,21,13,0,0,Math.PI*2);ctx.stroke()}ctx.restore()}
function drawScene(t,dt){const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);const z=currentZone();const wx=currentWeather();const isNight=!!state.isNight||wx.id==='night';
const sky=ctx.createLinearGradient(0,0,0,h);
if(isNight){sky.addColorStop(0,'#0b1226');sky.addColorStop(.38,'#152238');sky.addColorStop(.42,'#1a3a4a');sky.addColorStop(1,z.color[1])}
else if(wx.id==='storm'){sky.addColorStop(0,'#4a5568');sky.addColorStop(.38,'#64748b');sky.addColorStop(.42,'#3d6b7a');sky.addColorStop(1,z.color[1])}
else if(wx.id==='fog'){sky.addColorStop(0,'#9db0b8');sky.addColorStop(.38,'#b8c9c4');sky.addColorStop(.42,'#5a9aa8');sky.addColorStop(1,z.color[1])}
else if(wx.id==='wind'){sky.addColorStop(0,'#8ec5d4');sky.addColorStop(.38,'#b0d9d0');sky.addColorStop(.42,'#48b6c5');sky.addColorStop(1,z.color[1])}
else{sky.addColorStop(0,z.color[0]);sky.addColorStop(.39,'#c0e6d7');sky.addColorStop(.405,'#48b6c5');sky.addColorStop(1,z.color[1])}
ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
// weather FX
if(wx.id==='storm'||wx.id==='night'&&isNight){ctx.fillStyle=isNight?'#00000033':'#6b7f8b33';ctx.fillRect(0,0,w,h);ctx.strokeStyle=isNight?'#a5c4ff44':'#d8f4ff66';ctx.lineWidth=1;for(let i=0;i<50;i++){const x=(i*97+t*.18)%w,y=(i*61+t*.55)%(h*.55);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+14);ctx.stroke()}}
if(wx.id==='fog'){ctx.fillStyle='#c5d4d888';ctx.fillRect(0,0,w,h*.45);for(let i=0;i<6;i++){ctx.fillStyle=`rgba(200,220,230,${.08+i*.02})`;ctx.beginPath();ctx.ellipse((t*.02+i*160)%(w+100)-50,120+i*18,120,28,0,0,Math.PI*2);ctx.fill()}}
if(wx.id==='wind'){ctx.strokeStyle='#ffffff33';ctx.lineWidth=1.5;for(let i=0;i<12;i++){const y=40+i*12;const x=(t*.08+i*70)%(w+40)-20;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+30,y-4,x+60,y);ctx.stroke()}}
if(wx.id==='calm'&&!isNight){/* soft haze */ctx.fillStyle='#ffffff08';ctx.fillRect(0,0,w,h*.35)}
// sun or moon
if(isNight){ctx.globalAlpha=.85;ctx.fillStyle='#e8eef8';ctx.beginPath();ctx.arc(790,70,28,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.25;ctx.beginPath();ctx.arc(790,70,48,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#ffffffcc';for(let i=0;i<18;i++){const sx=(i*137+40)%w,sy=(i*89+20)%120;ctx.fillRect(sx,sy,2,2)}}
else{ctx.globalAlpha=.45;ctx.fillStyle=wx.id==='storm'?'#c0c8d0':'#fff0b5';ctx.beginPath();ctx.arc(790,70,35,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}
ctx.fillStyle='#497e7a';ctx.beginPath();ctx.moveTo(0,190);ctx.quadraticCurveTo(120,125,230,177);ctx.quadraticCurveTo(340,202,440,177);ctx.lineTo(440,211);ctx.lineTo(0,211);ctx.fill();
for(let i=0;i<11;i++){const x=((i*107+t*.012*(i%2?1:-1))%(w+90))-30,y=218+i*27;ctx.strokeStyle=`rgba(205,255,248,${.07+(i%3)*.025})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+22,y-4,x+48,y);ctx.stroke()}
ensureActors();actors.forEach(a=>{a.x+=a.dir*a.speed*dt;if(a.x<26){a.x=26;a.dir=1}if(a.x>w-26){a.x=w-26;a.dir=-1}a.y+=Math.sin(t*.0005+a.phase)*.09;drawFish(a,t)});
// sea floor shadows at different depths
ctx.globalAlpha=.12;ctx.fillStyle='#020d28';ctx.beginPath();ctx.moveTo(0,490);ctx.quadraticCurveTo(180,455,310,500);ctx.quadraticCurveTo(520,530,720,485);ctx.quadraticCurveTo(850,465,960,500);ctx.lineTo(960,540);ctx.lineTo(0,540);ctx.fill();ctx.globalAlpha=1;
// boat gently rocks — visual changes with equipped boat
const bx=100+(boatPosition*(w-200)),by=178+Math.sin(t*.002)*3,skin=Math.min(4,Math.max(0,Number(state.boatSkin)||0));
ctx.save();ctx.translate(bx,by);ctx.rotate(Math.sin(t*.0018)*.025);
if(skin===0){
 ctx.fillStyle='#66452f';ctx.beginPath();ctx.moveTo(-53,7);ctx.lineTo(55,7);ctx.lineTo(38,30);ctx.lineTo(-35,30);ctx.closePath();ctx.fill();
 ctx.fillStyle='#f4d38c';ctx.beginPath();ctx.moveTo(-7,-46);ctx.lineTo(-7,2);ctx.lineTo(34,2);ctx.closePath();ctx.fill();
 ctx.fillStyle='#fffdf1';ctx.beginPath();ctx.moveTo(-13,-36);ctx.lineTo(-13,0);ctx.lineTo(-43,0);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#4a392e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-7,-49);ctx.lineTo(-7,4);ctx.stroke();
 ctx.fillStyle='#b7e4df';roundedRect(-14,4,30,9,3);ctx.fill();
}else if(skin===1){
 ctx.fillStyle='#2c5f8a';ctx.beginPath();ctx.moveTo(-58,10);ctx.lineTo(62,10);ctx.lineTo(48,32);ctx.lineTo(-42,32);ctx.closePath();ctx.fill();
 ctx.fillStyle='#1a3d5c';ctx.beginPath();ctx.moveTo(-50,10);ctx.lineTo(54,10);ctx.lineTo(54,18);ctx.lineTo(-50,18);ctx.closePath();ctx.fill();
 ctx.fillStyle='#e8f4ff';roundedRect(-18,0,36,12,4);ctx.fill();
 ctx.fillStyle='#ff6b35';ctx.beginPath();ctx.moveTo(40,-8);ctx.lineTo(58,10);ctx.lineTo(40,10);ctx.closePath();ctx.fill();
 ctx.fillStyle='#c0d8e8';roundedRect(-12,4,20,6,2);ctx.fill();
}else if(skin===2){
 ctx.fillStyle='#3d5a4c';ctx.beginPath();ctx.moveTo(-62,8);ctx.lineTo(66,8);ctx.lineTo(50,34);ctx.lineTo(-46,34);ctx.closePath();ctx.fill();
 ctx.fillStyle='#2a4036';ctx.beginPath();ctx.moveTo(-55,8);ctx.lineTo(58,8);ctx.lineTo(58,16);ctx.lineTo(-55,16);ctx.closePath();ctx.fill();
 ctx.fillStyle='#d4e8dc';roundedRect(-22,-4,44,14,5);ctx.fill();
 ctx.fillStyle='#8fb89a';roundedRect(-16,2,14,8,2);ctx.fill();ctx.fillStyle='#8fb89a';roundedRect(4,2,14,8,2);ctx.fill();
 ctx.strokeStyle='#1e2e28';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,-28);ctx.lineTo(-5,8);ctx.stroke();
 ctx.fillStyle='#c5e0d0';ctx.beginPath();ctx.moveTo(-5,-28);ctx.lineTo(22,-4);ctx.lineTo(-5,-4);ctx.closePath();ctx.fill();
}else if(skin===3){
 ctx.fillStyle='#1e3a5f';ctx.beginPath();ctx.moveTo(-70,6);ctx.lineTo(72,6);ctx.lineTo(58,36);ctx.lineTo(-52,36);ctx.closePath();ctx.fill();
 ctx.fillStyle='#0d2137';ctx.beginPath();ctx.moveTo(-62,6);ctx.lineTo(64,6);ctx.lineTo(64,14);ctx.lineTo(-62,14);ctx.closePath();ctx.fill();
 ctx.fillStyle='#e8f0f8';roundedRect(-28,-8,56,16,6);ctx.fill();
 ctx.fillStyle='#7eb8e0';roundedRect(-22,0,18,8,2);ctx.fill();ctx.fillStyle='#7eb8e0';roundedRect(4,0,18,8,2);ctx.fill();
 ctx.fillStyle='#f0c040';ctx.beginPath();ctx.arc(48,0,6,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle='#c0d0e0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-10,-40);ctx.lineTo(-10,6);ctx.stroke();
 ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(-10,-40);ctx.lineTo(28,-8);ctx.lineTo(-10,-8);ctx.closePath();ctx.fill();
}else{
 ctx.fillStyle='#2a1848';ctx.beginPath();ctx.moveTo(-78,4);ctx.lineTo(80,4);ctx.lineTo(62,38);ctx.lineTo(-58,38);ctx.closePath();ctx.fill();
 ctx.fillStyle='#1a0e30';ctx.beginPath();ctx.moveTo(-70,4);ctx.lineTo(72,4);ctx.lineTo(72,14);ctx.lineTo(-70,14);ctx.closePath();ctx.fill();
 ctx.fillStyle='#e8d4ff';roundedRect(-32,-10,64,18,7);ctx.fill();
 ctx.fillStyle='#a78bfa';roundedRect(-24,-2,20,10,3);ctx.fill();ctx.fillStyle='#a78bfa';roundedRect(4,-2,20,10,3);ctx.fill();
 ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(52,-2,7,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle='#c4b5fd';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-8,-48);ctx.lineTo(-8,6);ctx.stroke();
 ctx.fillStyle='#ddd6fe';ctx.beginPath();ctx.moveTo(-8,-48);ctx.lineTo(32,-10);ctx.lineTo(-8,-10);ctx.closePath();ctx.fill();
 ctx.fillStyle='#7c3aed';ctx.globalAlpha=.35;ctx.beginPath();ctx.ellipse(0,20,55,8,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
}
ctx.restore();
if(cast&&!reelGame){const startX=bx+12,startY=by+12;if(cast.phase==='cast'){cast.t+=dt;cast.y=Math.min(485,cast.y+dt*(hasSkill('b4')?235:175));const contactRadius=(hasSkill('b6')?24:15)+SKILLS.filter(n=>n.branch==='rod'&&n.effect==='range'&&hasSkill(n.id)).reduce((a,n)=>a+n.amount/12,0)+relicBonus('radius')*9;let contact=null,bestDistance=Infinity;for(const a of actors){const dx=Math.abs(a.x-cast.x),dy=Math.abs(a.y-cast.y);if(dx<contactRadius+a.scale*10&&dy<12+a.scale*6&&dy<bestDistance){contact=a;bestDistance=dy}}if(contact&&!cast.hit){cast.hit=true;cast.target=contact;cast.phase='bite';cast.t=0;cast.y=contact.y;cast.x=contact.x;actors=actors.filter(a=>a!==contact);$('sea-message').textContent='¡Picada! ¡Pulsa en el momento justo!';sound('catch');startReelMinigame(contact.f)}else if(cast.y>=485){cast=null;castCooldown=.45;$('cast-label').textContent='Lanzar caña';$('sea-message').textContent='No había peces en el recorrido. Muévete con A/D y prueba otra vez.'}}if(cast&&cast.phase==='cast'){ctx.strokeStyle='#f4fff8';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(startX+18,startY+65,cast.x,cast.y);ctx.stroke();ctx.fillStyle='#ff696e';ctx.beginPath();ctx.ellipse(cast.x,cast.y,5,9,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#e1ffffaa';ctx.beginPath();ctx.ellipse(cast.x,cast.y+9,12+Math.sin(t*.008)*3,3,0,0,Math.PI*2);ctx.stroke()}}
// catch particles
for(let i=catchParticles.length-1;i>=0;i--){const p=catchParticles[i];p.life-=dt;p.x+=p.vx;p.y+=p.vy;p.vy+=8*dt;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();if(p.life<=0)catchParticles.splice(i,1)}ctx.globalAlpha=1;
ctx.fillStyle='#ffffffc9';ctx.font='bold 14px system-ui';ctx.fillText(z.emoji+' '+z.name,20,29);ctx.fillText(wx.emoji+' '+wx.name+(isNight?' 🌙':''),20,48);const evx=activeEvent();if(evx)ctx.fillText(evx.emoji+' '+evx.name,20,67)}
let boatPosition=.5;function frame(t){if(activeScreen!=='fishing'&&!sessionActive){raf=0;return}if(!lastFrame)lastFrame=t;let dt=Math.min(.05,(t-lastFrame)/1000);lastFrame=t;if(sessionActive){timer-=dt;if(timer<=0){timer=0;$('timer').innerHTML='0<span>s</span>';drawScene(t,0);endFishing();raf=0;return}if(keys.left)boatPosition=Math.max(.015,boatPosition-boatSpeed()*dt);if(keys.right)boatPosition=Math.min(.985,boatPosition+boatSpeed()*dt);if(castCooldown>0)castCooldown-=dt;if(reelGame)updateReelMinigame(dt);$('timer').innerHTML=`${Math.ceil(timer)}<span>s</span>`;drawScene(t,dt);raf=requestAnimationFrame(frame)}else{if(reelGame){updateReelMinigame(dt);drawScene(t,dt);raf=requestAnimationFrame(frame)}else raf=0}}
const keys={left:false,right:false};function startLoop(){if(!raf)raf=requestAnimationFrame(frame)}
function modal({icon='🐟',eyebrow='AVENTURA',title,desc='',stats=[],action='Continuar',onAction=hideModal}){const actionButton=$('modal-action');actionButton.disabled=false;actionButton.removeAttribute('aria-disabled');actionButton.textContent=action;actionButton.onclick=onAction;$('modal-icon').textContent=icon;$('modal-eyebrow').textContent=eyebrow;$('modal-title').textContent=title;$('modal-desc').textContent=desc;$('modal-stats').innerHTML=stats.map(s=>`<div class="modal-stat"><small>${s[0]}</small><b>${s[1]}</b></div>`).join('');$('modal').classList.toggle('catch-modal',String(eyebrow).includes('CAPTURA'));$('modal').classList.remove('hidden')}
function hideModal(){$('modal').classList.add('hidden')}
function sellIndex(i){if(i<0||i>=state.hold.length)return;const id=state.hold.splice(i,1)[0],value=price(fish[id]);state.money+=value;state.totalSales+=value;trackDaily('soldValue',value);sound('sell');save();updateTop();renderHold();toast(`Vendido por ${cash(value)}`)}
function sellAll(){if(!state.hold.length)return;const total=state.hold.reduce((s,id)=>s+price(fish[id]),0),n=state.hold.length;state.hold=[];state.money+=total;state.totalSales+=total;trackDaily('soldValue',total);sound('sell');save();updateTop();renderHold();modal({icon:'💰',eyebrow:'VENTA COMPLETADA',title:'¡Trato hecho!',desc:`Has vendido ${n} ${n===1?'pez':'peces'} en el puerto. Tu siguiente aventura te espera.`,stats:[['Ingresos',cash(total)],['Nuevo saldo',cash(state.money)]],action:'Volver al menú',onAction:()=>{hideModal();showScreen('menu')}})}
function buySkill(id){const n=SKILLS.find(x=>x.id===id);if(!n||hasSkill(id)||(n.req&&!hasSkill(n.req))||state.money<n.cost)return;state.money-=n.cost;state.skillNodes.push(id);sound('upgrade');save();updateTop();renderUpgrades();toast('Habilidad desbloqueada: '+n.name)}
function selectZone(i){const z=zones[i];if(!z)return;if(!state.unlocked.includes(i)){if(state.money<z.price){modal({icon:'🔒',eyebrow:'DESTINO BLOQUEADO',title:'Aún no te alcanza',desc:`Necesitas ${cash(z.price)} para explorar ${z.name}. Vende capturas y mejora tus ingresos.`,stats:[['Tu saldo',cash(state.money)],['Precio',cash(z.price)]],action:'Entendido'});return}state.money-=z.price;state.unlocked.push(i);sound('upgrade')}state.zone=i;save();updateTop();renderZones();renderMenu();toast(`Destino seleccionado: ${z.name}`)}
// Sistemas adicionales: astillero, tesoros, acuario, contratos y torneo.
$('boat-options').addEventListener('click',e=>{const b=e.target.closest('[data-boat]');if(b)buyBoat(Number(b.dataset.boat))});$('treasure-slots')?.addEventListener('click',e=>{const b=e.target.closest('[data-unequip-relic]');if(!b)return;state.equippedRelics=state.equippedRelics.filter(id=>String(id)!==String(b.dataset.unequipRelic));save();renderTreasures();sound('click')});$('treasure-encyclopedia-list')?.addEventListener('click',e=>{const b=e.target.closest('[data-treasure-catalog]');if(b)openTreasureCatalogDetail(b.dataset.treasureCatalog)});function setTreasureView(view){treasureView=view==='encyclopedia'?'encyclopedia':'equipment';$('treasure-equipment-view').classList.toggle('hidden',treasureView!=='equipment');$('treasure-encyclopedia-view').classList.toggle('hidden',treasureView!=='encyclopedia');if(treasureView==='encyclopedia')renderTreasureEncyclopedia();sound('click')} $('open-treasure-encyclopedia').addEventListener('click',()=>setTreasureView('encyclopedia'));$('close-treasure-encyclopedia').addEventListener('click',()=>setTreasureView('equipment'));$('treasure-search').addEventListener('input',()=>{treasureBookPage=0;renderTreasureEncyclopedia()});$('treasure-rarity-filter').addEventListener('change',()=>{treasureBookPage=0;renderTreasureEncyclopedia()});$('treasure-prev-page').addEventListener('click',()=>{treasureBookPage--;renderTreasureEncyclopedia()});$('treasure-next-page').addEventListener('click',()=>{treasureBookPage++;renderTreasureEncyclopedia()});$('aquarium-prev-page').addEventListener('click',()=>{aquariumPage--;renderAquarium()});$('aquarium-next-page').addEventListener('click',()=>{aquariumPage++;renderAquarium()});$('treasure-list').addEventListener('click',e=>{const st=e.target.closest('[data-sell-treasure]');if(st){const id=st.dataset.sellTreasure,t=state.treasures.find(x=>String(x.id)===String(id));if(!t)return;state.treasures=state.treasures.filter(x=>String(x.id)!==String(id));state.equippedRelics=state.equippedRelics.filter(x=>String(x)!==String(id));state.money+=t.value;state.totalSales+=t.value;save();updateTop();renderTreasures();sound('sell');return}const eq=e.target.closest('[data-equip-relic]');if(eq){const id=String(eq.dataset.equipRelic),item=[...(state.relics||[]),...(state.treasures||[])].find(x=>String(x.id)===id);if(!item)return;if((state.equippedRelics||[]).some(x=>String(x)===id))return;if(state.equippedRelics.length>=boatRelicSlots()){toast('No tienes espacios de tesoros disponibles');return}if(!item.bonus){const template=treasureTypes.find(x=>x.name===item.name);if(template){item.bonus=template.bonus;item.passive=item.passive||template.passive}}state.equippedRelics.push(id);save();renderTreasures();sound('upgrade');toast(`Habilidad activada: ${item.name}`);return}const sell=e.target.closest('[data-sell-relic]');if(sell){const id=String(sell.dataset.sellRelic),r=state.relics.find(x=>String(x.id)===id);if(!r)return;state.relics=state.relics.filter(x=>String(x.id)!==id);state.equippedRelics=state.equippedRelics.filter(x=>String(x)!==id);state.money+=r.value;state.totalSales+=r.value;save();updateTop();renderTreasures();sound('sell');return}});$('sell-treasures').addEventListener('click',()=>{const ordinary=state.treasures||[],relics=state.relics||[],all=[...ordinary,...relics],total=all.reduce((n,t)=>n+(Number(t.value)||0),0),count=all.length;if(!count)return;state.treasures=[];state.relics=[];state.equippedRelics=[];state.money+=total;state.totalSales+=total;save();updateTop();renderTreasures();sound('sell');modal({icon:'💰',title:'Tesoros vendidos',desc:`Has vendido ${count} tesoros por ${cash(total)}.`,stats:[['Ingresos',cash(total)]],action:'Continuar'})});$('aquarium-list').addEventListener('click',e=>{const b=e.target.closest('[data-aquarium]');if(!b)return;const id=Number(b.dataset.aquarium);if(!state.discovered.includes(id)||!fish[id]||!aquariumRarityUnlocked(fish[id].rarity)||state.aquarium.includes(id)||state.aquarium.length>=aquariumCapacity())return;state.aquarium.push(id);save();renderAquarium();toast(`${fish[id].name} añadido a la pecera`)});$('aquarium-tank').addEventListener('click',e=>{const b=e.target.closest('[data-aquarium-info]');if(!b)return;const id=Number(b.dataset.aquariumInfo),f=fish[id];if(!f)return;modal({icon:f.emoji,title:f.name,eyebrow:rarities[f.rarity],desc:'Información del ejemplar expuesto en tu acuario.',stats:[['Rareza',rarities[f.rarity]],['Peso',f.weight+' kg'],['Valor de venta',cash(f.value)],['Ingresos diarios',cash(aquariumFishIncome(id))]],action:'Retirar del acuario',onAction:()=>{hideModal();state.aquarium=state.aquarium.filter(x=>x!==id);save();renderAquarium();toast(`${f.name} retirado de la pecera`)}})});$('aquarium-search').addEventListener('input',()=>{aquariumPage=0;renderAquarium()});$('mission-list').addEventListener('click',e=>{const b=e.target.closest('[data-mission]');if(b)claimMission(b.dataset.mission)});
// Navigation and buttons
$('begin').addEventListener('click',()=>{startMusic();state.hasStarted=true;save();sound('click');showScreen('menu')});$('brand-home').addEventListener('click',e=>{e.preventDefault();if(expeditionPausedForSettings){returnFromSettings();return}if(!sessionActive)showScreen(state.hasStarted?'menu':'intro')});$('settings-open').addEventListener('click',openSettings);$('leave-expedition').addEventListener('click',()=>{if(sessionActive)endFishing()});$('open-expedition-hold').addEventListener('click',openExpeditionHold);$('close-expedition-hold').addEventListener('click',closeExpeditionHold);$('go-fishing').addEventListener('click',startFishing);
document.querySelectorAll('[data-mission-tab]').forEach(btn=>btn.addEventListener('click',()=>{setMissionTab(btn.dataset.missionTab);sound('click')}));
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>{sound('click');showScreen(b.dataset.screen)}));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{sound('click');if(activeScreen==='settings')returnFromSettings();else showScreen('menu')}));$('zone-grid').addEventListener('click',e=>{const b=e.target.closest('[data-zone]');if(b){selectZone(Number(b.dataset.zone));renderZones()}});$('upgrade-grid').addEventListener('click',e=>{const rs=e.target.closest('[data-relic-storage-upgrade]');if(rs){openTreasureUpgradeDetail(Number(rs.dataset.relicStorageUpgrade));return}const aq=e.target.closest('[data-aquarium-upgrade]');if(aq){openAquariumUpgradeDetail(Number(aq.dataset.aquariumUpgrade));return}const wh=e.target.closest('[data-warehouse-upgrade]');if(wh){openWarehouseUpgradeDetail(Number(wh.dataset.warehouseUpgrade));return}const tab=e.target.closest('[data-branch]');if(tab){selectedSkillBranch=tab.dataset.branch;renderUpgrades();sound('click');return}const b=e.target.closest('[data-skill]');if(b)openSkillDetail(b.dataset.skill)});$('hold-list').addEventListener('click',e=>{const store=e.target.closest('[data-store]');if(store){storeToWarehouse(Number(store.dataset.store));return}const b=e.target.closest('[data-sell]');if(b)sellIndex(Number(b.dataset.sell))});$('warehouse-list')?.addEventListener('click',e=>{const u=e.target.closest('[data-unstore]');if(u){unstoreFromWarehouse(Number(u.dataset.unstore));return}const s=e.target.closest('[data-sell-warehouse]');if(s)sellWarehouseIndex(Number(s.dataset.sellWarehouse))});$('sell-all').addEventListener('click',sellAll);$('daily-mission-list')?.addEventListener('click',e=>{const b=e.target.closest('[data-daily]');if(b)claimDailyMission(b.dataset.daily)});$('contract-list')?.addEventListener('click',e=>{const b=e.target.closest('[data-deliver]');if(b)deliverContract(b.dataset.deliver)});$('story-mission-list')?.addEventListener('click',e=>{const w=e.target.closest('[data-weekly]');if(w){claimWeeklyMission(w.dataset.weekly);return}const b=e.target.closest('[data-story]');if(b)claimStoryMission(b.dataset.story)});$('fish-search').addEventListener('input',()=>{bookPage=0;renderBook()});
$('fish-grid')?.addEventListener('click',e=>{
 const card=e.target.closest('[data-fish-info]');if(!card)return;
 const f=fish[Number(card.dataset.fishInfo)];if(!f)return;
 const got=(state.discovered||[]).includes(f.id);
 modal({icon:got?f.emoji:'❔',eyebrow:got?rarities[f.rarity]:'???',title:got?f.name:'Especie desconocida',desc:got?`Zona: ${(f.zones||[zones[f.minZone||0]?.name]).join(', ')}`:'Aún no la has descubierto.',stats:got?[['ID enciclopedia',String(f.id)],['Peso',f.weight+' kg'],['Profundidad',f.depth+' m'],['Valor base',cash(f.value)],['Rareza',rarities[f.rarity]]]:[['ID enciclopedia',String(f.id)]],action:'Cerrar'});
});
$('rarity-filter').addEventListener('change',()=>{bookPage=0;renderBook()});$('zone-filter')?.addEventListener('change',()=>{bookPage=0;renderBook()});$('missing-only')?.addEventListener('change',()=>{bookPage=0;renderBook()});$('prev-page').addEventListener('click',()=>{bookPage--;renderBook()});$('next-page').addEventListener('click',()=>{bookPage++;renderBook()});$('cast-button').addEventListener('click',()=>{if(reelGame)tryReelHook();else castLine()});$('reel-hook')?.addEventListener('click',tryReelHook);$('left-touch').addEventListener('pointerdown',e=>{e.preventDefault();keys.left=true});$('right-touch').addEventListener('pointerdown',e=>{e.preventDefault();keys.right=true});['pointerup','pointerleave','pointercancel'].forEach(ev=>{$('left-touch').addEventListener(ev,()=>{keys.left=false});$('right-touch').addEventListener(ev,()=>{keys.right=false})});document.addEventListener('keydown',e=>{if(reelGame&&(e.key.toLowerCase()==='e'||e.key===' ')){e.preventDefault();tryReelHook();return}if(!sessionActive)return;if(['a','A','d','D','e','E','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(e.key.toLowerCase()==='a'||e.key==='ArrowLeft')keys.left=true;if(e.key.toLowerCase()==='d'||e.key==='ArrowRight')keys.right=true;if(e.key.toLowerCase()==='e'||e.key===' ')castLine()});document.addEventListener('keyup',e=>{if(e.key.toLowerCase()==='a'||e.key==='ArrowLeft')keys.left=false;if(e.key.toLowerCase()==='d'||e.key==='ArrowRight')keys.right=false});$('sound-toggle').addEventListener('click',()=>{state.sound=!state.sound;save();renderSettings();if(state.sound)sound('click')});$('music-toggle')?.addEventListener('click',()=>{state.musicEnabled=!(state.musicEnabled===false);save();renderSettings();if(state.musicEnabled!==false){musicStarting=false;startMusic()}else stopMusic();});$('music-volume').addEventListener('input',e=>{state.musicVolume=Number(e.target.value);$('music-volume-value').textContent=state.musicVolume+' %';syncMusicVolume();save();if(state.musicEnabled!==false&&music.paused&&state.musicVolume>0)startMusic()});$('effects-volume').addEventListener('input',e=>{state.effectsVolume=Number(e.target.value);$('effects-volume-value').textContent=state.effectsVolume+' %';save()});$('fullscreen').addEventListener('click',async()=>{try{if(!document.fullscreenElement)await $('app').requestFullscreen();else await document.exitFullscreen();$('fullscreen').textContent=document.fullscreenElement?'⛶ Salir de pantalla completa':'⛶ Activar'}catch(e){modal({icon:'⛶',title:'Pantalla completa no disponible',desc:'Tu navegador no permite pantalla completa en este contexto. Prueba a abrir la aplicación desde una pestaña normal.',action:'Entendido'})}});document.addEventListener('fullscreenchange',()=>$('fullscreen').textContent=document.fullscreenElement?'⛶ Salir de pantalla completa':'⛶ Activar');$('install-app').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;renderSettings()});$('export-save').addEventListener('click',exportSave);$('import-save').addEventListener('click',()=>$('import-save-file').click());$('import-save-file').addEventListener('change',e=>{const file=e.target.files&&e.target.files[0];if(file)modal({icon:'📥',eyebrow:'IMPORTAR PARTIDA',title:'¿Sustituir tu progreso?',desc:'Se reemplazará la partida actual por el contenido del archivo seleccionado.',stats:[],action:'Importar partida',onAction:()=>{hideModal();importSaveFile(file);e.target.value=''}})});$('reset-game').addEventListener('click',()=>modal({icon:'⚠️',eyebrow:'BORRAR PROGRESO',title:'¿Reiniciar la partida?',desc:'Se perderán el dinero, las mejoras, las zonas desbloqueadas y todas las especies descubiertas. Esta acción no se puede deshacer.',stats:[],action:'Sí, reiniciar',onAction:async()=>{state=defaultState();expeditionPausedForSettings=false;expeditionPausedForHold=false;sessionActive=false;save();hideModal();showScreen('intro');updateTop();sound('click');toast('Partida reiniciada. Limpiando caché…');await clearAppCache()}}));$('modal-close').addEventListener('click',hideModal);$('modal').addEventListener('click',e=>{if(e.target===$('modal'))hideModal()});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;renderSettings()});window.addEventListener('appinstalled',()=>{installPrompt=null;renderSettings()});
// Installability, offline cache and start-up
if('serviceWorker'in navigator&&/^https?:$/.test(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
$('tutorial-next')?.addEventListener('click',()=>{sound('click');advanceTutorial()});$('tutorial-skip')?.addEventListener('click',()=>{sound('click');skipTutorial()});
$('bait-list')?.addEventListener('click',e=>{const b=e.target.closest('[data-buy-bait]');if(b){buyBait(b.dataset.buyBait);return}const eq=e.target.closest('[data-equip-bait]');if(eq)equipBait(eq.dataset.equipBait||null)});
$('gacha-list')?.addEventListener('click',e=>{const g=e.target.closest('[data-open-gacha]');if(g)openGacha(g.dataset.openGacha)});document.querySelectorAll('[data-gacha-tab]').forEach(b=>b.addEventListener('click',()=>{window._gachaTab=b.dataset.gachaTab;renderGacha();sound('click')}));document.querySelectorAll('[data-zone-tab]').forEach(b=>b.addEventListener('click',()=>{window._zoneTab=b.dataset.zoneTab;renderZones();sound('click')}));
$('go-night')?.addEventListener('click',()=>{if(sessionActive)return;if(!(state.unlocked||[]).some(z=>z>=3)){toast('Pesca nocturna a partir de la zona 4 (Mar abierto)');return}if((state.nightUsedDay||0)===state.day){toast('Ya usaste la pesca nocturna hoy');return}state.isNight=true;state.nightUsedDay=state.day;save();startFishing();toast('🌙 Pesca nocturna (1/día)');});
document.querySelector('.weather-badge')?.addEventListener('click',()=>{sound('click');openWeatherInfo()});
document.body.addEventListener('click',e=>{
 const pet=e.target.closest('[data-pet]');
 if(pet){state.boatPet=pet.dataset.pet;save();renderStats();toast('Mascota equipada');sound('click');return}
 if(e.target.id==='gift-code-btn'||e.target.closest('#gift-code-btn')){tryGiftCode($('gift-code-input')?.value);return}
});

document.querySelector('.weather-badge')?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openWeatherInfo()}});
setInterval(()=>{if(!state.stats)state.stats={};if(state.hasStarted)state.stats.playSeconds=(state.stats.playSeconds||0)+1},1000);

normalizeTreasureAbilities();updateTop();if(state.hasStarted)showScreen('menu');else showScreen('intro');renderZones();renderUpgrades();renderBook();renderHold();renderSettings();renderBoat();renderTreasures();renderAquarium();ensureDailyContent();ensureWeeklyContent();renderMissions();dailyWorld();checkAchievements();maybeDailyLogin();renderAchievements();startMusic();if(state.hasStarted&&!state.tutorialDone)renderTutorial();document.addEventListener('pointerdown',startMusic,{once:true});
// mobile: silenciar highlight residual
document.addEventListener('touchend',e=>{const t=e.target.closest('button,a,.dash-card,.zone-card,.mission-tab,.toggle');if(t)t.blur&&t.blur()},{passive:true});document.addEventListener('keydown',startMusic,{once:true});
setInterval(()=>{if(activeScreen==='missions'){const el=$('daily-countdown');if(el)el.textContent=formatCountdown(msUntilMidnight());const lab=$('daily-reset-label');if(lab)lab.textContent='Reinicio a las 00:00 · queda '+formatCountdown(msUntilMidnight());ensureDailyContent()}},1000);
})();
