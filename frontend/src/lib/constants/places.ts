const PLACES: Place[] = [
  {
    lat: "41.6938026",
    lon: "44.8015168",
    name: {
      en: "Tbilisi",
      ka: "თბილისი",
    },
    osm: "relation:1996871",
  },
  {
    lat: "41.6460978",
    lon: "41.64049",
    name: {
      en: "Batumi",
      ka: "ბათუმი",
    },
    osm: "relation:2009237",
  },
  {
    lat: "42.2718354",
    lon: "42.7060404",
    name: {
      en: "Kutaisi",
      ka: "ქუთაისი",
    },
    osm: "relation:2024547",
  },
  {
    lat: "41.5433907",
    lon: "45.0107899",
    name: {
      en: "Rustavi",
      ka: "რუსთავი",
    },
    osm: "relation:1997305",
  },
  {
    lat: "41.9854144",
    lon: "44.108411",
    name: {
      en: "Gori",
      ka: "გორი",
    },
    osm: "relation:8374250",
  },
  {
    lat: "42.5091391",
    lon: "41.866992",
    name: {
      en: "Zugdidi",
      ka: "ზუგდიდი",
    },
    osm: "relation:8374200",
  },
  {
    lat: "42.1426914",
    lon: "41.6737886",
    name: {
      en: "Poti",
      ka: "ფოთი",
    },
    osm: "relation:1995348",
  },
  {
    lat: "41.9837685",
    lon: "43.5865947",
    name: {
      en: "Khashuri",
      ka: "ხაშური",
    },
    osm: "way:257600550",
  },
  {
    lat: "42.1599257",
    lon: "42.3367678",
    name: {
      en: "Samtredia",
      ka: "სამტრედია",
    },
    osm: "relation:14282785",
  },
  {
    lat: "42.269636",
    lon: "42.0656896",
    name: {
      en: "Senaki",
      ka: "სენაკი",
    },
    osm: "way:30594351",
  },
  {
    lat: "42.1083332",
    lon: "43.0374933",
    name: {
      en: "Zestafoni",
      ka: "ზესტაფონი",
    },
    osm: "relation:6255831",
  },
  {
    lat: "41.7555687",
    lon: "42.8315217",
    name: {
      en: "Abastumani",
      ka: "აბასთუმანი",
    },
    osm: "node:457440730",
  },
  {
    lat: "42.2046024",
    lon: "42.2029857",
    name: {
      en: "Abasha",
      ka: "აბაშა",
    },
    osm: "relation:2016164",
  },
  {
    lat: "42.0387882",
    lon: "43.8242982",
    name: {
      en: "Agara",
      ka: "აგარა",
    },
    osm: "way:265377360",
  },
  {
    lat: "41.6764745",
    lon: "42.7085995",
    name: {
      en: "Adigeni",
      ka: "ადიგენი",
    },
    osm: "way:641778126",
  },
  {
    lat: "42.5144988",
    lon: "43.1457691",
    name: {
      en: "Ambrolauri",
      ka: "ამბროლაური",
    },
    osm: "relation:8374177",
  },
  {
    lat: "41.5741004",
    lon: "43.2496892",
    name: {
      en: "Aspindza",
      ka: "ასპინძა",
    },
    osm: "way:95779182",
  },
  {
    lat: "41.9253854",
    lon: "43.4907611",
    name: {
      en: "Akhaldaba",
      ka: "ახალდაბა",
    },
    osm: "node:1796703287",
  },

  {
    lat: "41.4025151",
    lon: "43.4871631",
    name: {
      en: "Akhalkalaki",
      ka: "ახალქალაქი",
    },
    osm: "relation:16929994",
  },
  {
    lat: "41.6434293",
    lon: "42.9934449",
    name: {
      en: "Akhaltsikhe",
      ka: "ახალციხე",
    },
    osm: "relation:8374207",
  },
  {
    lat: "42.0385204",
    lon: "45.2068411",
    name: {
      en: "Akhmeta",
      ka: "ახმეტა",
    },
    osm: "way:33836710",
  },
  {
    lat: "41.7509723",
    lon: "43.5291848",
    name: {
      en: "Bakuriani",
      ka: "ბაკურიანი",
    },
    osm: "way:715323243",
  },
  {
    lat: "42.4784",
    lon: "44.4833",
    name: {
      en: "Gudauri",
      ka: "გუდაური",
    },
    osm: "node:307335639",
  },
  {
    lat: "42.0732393",
    lon: "42.8212218",
    name: {
      en: "Baghdati",
      ka: "ბაღდათი",
    },
    osm: "way:1124828725",
  },
  {
    lat: "41.8509999",
    lon: "42.3283556",
    name: {
      en: "Bakhmaro",
      ka: "ბახმარო",
    },
    osm: "node:540584996",
  },
  {
    lat: "41.6",
    lon: "44.216667",
    name: {
      en: "Bediani",
      ka: "ბედიანი",
    },
    osm: "node:457327657",
  },
  {
    lat: "41.4493594",
    lon: "44.5488663",
    name: {
      en: "Bolnisi",
      ka: "ბოლნისი",
    },
    osm: "way:75732327",
  },
  {
    lat: "41.8399528",
    lon: "43.3907569",
    name: {
      en: "Borjomi",
      ka: "ბორჯომი",
    },
    osm: "relation:17409709",
  },
  {
    lat: "41.4584982",
    lon: "45.0913202",
    name: {
      en: "Gardabani",
      ka: "გარდაბანი",
    },
    osm: "way:405145687",
  },
  {
    lat: "41.8239683",
    lon: "42.1594592",
    name: {
      en: "Gomismta",
      ka: "გომისმთა",
    },
    osm: "relation:17372923",
  },
  {
    lat: "41.7438812",
    lon: "45.7893806",
    name: {
      en: "Gurjaani",
      ka: "გურჯაანი",
    },
    osm: "way:74688344",
  },
  {
    lat: "41.4672254",
    lon: "46.1175215",
    name: {
      en: "Dedoplis Tskaro",
      ka: "დედოფლისწყარო",
    },
    osm: "way:102156589",
  },
  {
    lat: "41.7260416",
    lon: "44.9621678",
    name: {
      en: "Didi Lilo",
      ka: "დიდი ლილო",
    },
    osm: "node:893258178",
  },
  {
    lat: "41.3298054",
    lon: "44.2073125",
    name: {
      en: "Dmanisi",
      ka: "დმანისი",
    },
    osm: "relation:17403257",
  },
  {
    lat: "42.0869842",
    lon: "44.6948451",
    name: {
      en: "Dusheti",
      ka: "დუშეთი",
    },
    osm: "way:33880279",
  },
  {
    lat: "41.6137961",
    lon: "42.8762335",
    name: {
      en: "Vale",
      ka: "ვალე",
    },
    osm: "node:218366796",
  },
  {
    lat: "42.0889602",
    lon: "42.5044843",
    name: {
      en: "Vani",
      ka: "ვანი",
    },
    osm: "way:1123179833",
  },
  {
    lat: "41.8278585",
    lon: "44.7562291",
    name: {
      en: "Zahesi",
      ka: "ზაჰესი",
    },
    osm: "way:152297954",
  },
  {
    lat: "41.4740766",
    lon: "44.717882",
    name: {
      en: "Tamarisi",
      ka: "თამარისი",
    },
    osm: "way:77467961",
  },
  {
    lat: "41.5423083",
    lon: "44.4725636",
    name: {
      en: "Tetri Tskaro",
      ka: "თეთრი წყარო",
    },
    osm: "relation:17400045",
  },
  {
    lat: "41.918509",
    lon: "45.4776909",
    name: {
      en: "Telavi",
      ka: "თელავი",
    },
    osm: "relation:8374133",
  },
  {
    lat: "42.1827769",
    lon: "42.968645",
    name: {
      en: "Terjola",
      ka: "თერჯოლა",
    },
    osm: "way:34008761",
  },
  {
    lat: "42.1119268",
    lon: "44.9672862",
    name: {
      en: "Tianeti",
      ka: "თიანეთი",
    },
    osm: "way:95067936",
  },
  {
    lat: "41.497149",
    lon: "44.166654",
    name: {
      en: "Didi Gomareti",
      ka: "დიდი გომარეთი",
    },
    osm: "way:101712229",
  },
  {
    lat: "41.3820084",
    lon: "44.4181799",
    name: {
      en: "Kazreti",
      ka: "Kazreti",
    },
    osm: "relation:16461536",
  },
  {
    lat: "41.9260017",
    lon: "44.4245026",
    name: {
      en: "Kaspi",
      ka: "კასპი",
    },
    osm: "way:25688527",
  },
  {
    lat: "41.6611758",
    lon: "44.7085831",
    name: {
      en: "Kojori",
      ka: "კოჯორი",
    },
    osm: "node:449107371",
  },
  {
    lat: "42.2064232",
    lon: "42.3448676",
    name: {
      en: "Kulashi",
      ka: "ყულაში",
    },
    osm: "relation:17570143",
  },
  {
    lat: "41.8186298",
    lon: "46.2781308",
    name: {
      en: "Lagodekhi",
      ka: "ლაგოდეხი",
    },
    osm: "way:33880381",
  },
  {
    lat: "41.9150071",
    lon: "41.9067358",
    name: {
      en: "Laituri",
      ka: "ლაითური",
    },
    osm: "relation:8812554",
  },
  {
    lat: "42.0902225",
    lon: "42.0359712",
    name: {
      en: "Lanchkhuti",
      ka: "ლანჩხუთი",
    },
    osm: "relation:16170926",
  },
  {
    lat: "42.7931509",
    lon: "42.7187306",
    name: {
      en: "Lentekhi",
      ka: "ლენტეხი",
    },
    osm: "way:159047970",
  },
  {
    lat: "41.6969125",
    lon: "44.3734881",
    name: {
      en: "Manglisi",
      ka: "მანგლისი",
    },
    osm: "node:387157943",
  },
  {
    lat: "41.4689396",
    lon: "44.785078",
    name: {
      en: "Marneuli",
      ka: "მარნეული",
    },
    osm: "way:33728338",
  },
  {
    lat: "42.4231839",
    lon: "42.3811146",
    name: {
      en: "Martvili",
      ka: "მარტვილი",
    },
    osm: "relation:2016165",
  },
  {
    lat: "43.0334614",
    lon: "42.6894803",
    name: {
      en: "Mestia",
      ka: "მესტია",
    },
    osm: "way:628347610",
  },
  {
    lat: "41.8411674",
    lon: "44.7073864",
    name: {
      en: "Mtskheta",
      ka: "მცხეთა",
    },
    osm: "relation:8374155",
  },
  {
    lat: "41.9087741",
    lon: "41.9587011",
    name: {
      en: "Naruja",
      ka: "ნარუჯა",
    },
    osm: "node:479795760",
  },
  {
    lat: "41.2713699",
    lon: "43.5879385",
    name: {
      en: "Ninotsminda",
      ka: "ნინოწმინდა",
    },
    osm: "way:33880592",
  },
  {
    lat: "41.9208048",
    lon: "41.9931328",
    name: {
      en: "Ozurgeti",
      ka: "ოზურგეთი",
    },
    osm: "relation:8374107",
  },
  {
    lat: "42.5779358",
    lon: "43.4350888",
    name: {
      en: "Oni",
      ka: "ონი",
    },
    osm: "way:34012039",
  },
  {
    lat: "41.8568161",
    lon: "41.8295733",
    name: {
      en: "Ochkhamuri",
      ka: "ოჩხამური",
    },
    osm: "relation:15704082",
  },
  {
    lat: "42.1102695",
    lon: "44.7710122",
    name: {
      en: "Zhinvali",
      ka: "ჟინვალი",
    },
    osm: "way:1198406837",
  },
  {
    lat: "41.725392",
    lon: "45.3350791",
    name: {
      en: "Sagarejo",
      ka: "საგარეჯო",
    },
    osm: "way:26294040",
  },
  {
    lat: "42.3420079",
    lon: "43.4106045",
    name: {
      en: "Sachkhere",
      ka: "საჩხერე",
    },
    osm: "relation:16430751",
  },
  {
    lat: "41.9941264",
    lon: "45.0271885",
    name: {
      en: "Sioni",
      ka: "სიონი",
    },
    osm: "node:430591142",
  },
  {
    lat: "41.6111031",
    lon: "45.9271436",
    name: {
      en: "Sighnaghi",
      ka: "სიღნაღი",
    },
    osm: "relation:16768135",
  },
  {
    lat: "42.6583174",
    lon: "44.6409521",
    name: {
      en: "Stepantsminda",
      ka: "სტეფანწმინდა",
    },
    osm: "relation:15904860",
  },
  {
    lat: "42.0264858",
    lon: "43.5525728",
    name: {
      en: "Surami",
      ka: "სურამი",
    },
    osm: "relation:17639369",
  },
  {
    lat: "42.3414123",
    lon: "42.994164",
    name: {
      en: "Tkibuli",
      ka: "ტყიბული",
    },
    osm: "node:292823696",
  },
  {
    lat: "41.995165",
    lon: "41.7706599",
    name: {
      en: "Ureki",
      ka: "ურეკი",
    },
    osm: "relation:16832399",
  },
  {
    lat: "42.3521585",
    lon: "44.6875132",
    name: {
      en: "Pasanauri",
      ka: "ფასანაური",
    },
    osm: "relation:12583037",
  },
  {
    lat: "42.0205787",
    lon: "43.8791908",
    name: {
      en: "Kareli",
      ka: "კარელი",
    },
    osm: "way:27153367",
  },
  {
    lat: "41.5975562",
    lon: "41.9451692",
    name: {
      en: "Keda",
      ka: "ქედა",
    },
    osm: "node:218643951",
  },
  {
    lat: "41.9674244",
    lon: "42.0116633",
    name: {
      en: "Kveda Nasakirali",
      ka: "ქვედა ნასაკირალი",
    },
    osm: "node:479792592",
  },
  {
    lat: "41.815997",
    lon: "41.7838101",
    name: {
      en: "Kobuleti",
      ka: "ქობულეთი",
    },
    osm: "relation:13593738",
  },
  {
    lat: "41.9483514",
    lon: "45.8147919",
    name: {
      en: "Kvareli",
      ka: "ყვარელი",
    },
    osm: "way:31970772",
  },

  {
    lat: "42.0943874",
    lon: "43.080345",
    name: {
      en: "Shorapani",
      ka: "შორაპანი",
    },
    osm: "node:540155231",
  },
  {
    lat: "41.631471",
    lon: "42.1907465",
    name: {
      en: "Shuakhevi",
      ka: "შუახევი",
    },
    osm: "node:218704706",
  },
  {
    lat: "41.7307175",
    lon: "41.7360343",
    name: {
      en: "Chakvi",
      ka: "ჩაქვი",
    },
    osm: "relation:15061261",
  },
  {
    lat: "42.0183362",
    lon: "42.2365827",
    name: {
      en: "Chokhatauri",
      ka: "ჩოხატაური",
    },
    osm: "relation:14057963",
  },
  {
    lat: "42.5219111",
    lon: "42.1276727",
    name: {
      en: "Chkhorotsku",
      ka: "ჩხოროწყუ",
    },
    osm: "way:30594355",
  },
  {
    lat: "42.6482211",
    lon: "42.764886",
    name: {
      en: "Tsageri",
      ka: "ცაგერი",
    },
    osm: "relation:15694560",
  },
  {
    lat: "42.6215005",
    lon: "42.0660097",
    name: {
      en: "Tsalenjikha",
      ka: "წალენჯიხა",
    },
    osm: "way:28357831",
  },
  {
    lat: "41.5979563",
    lon: "44.0946881",
    name: {
      en: "Tsalka",
      ka: "წალკა",
    },
    osm: "way:34012533",
  },
  {
    lat: "41.8012304",
    lon: "43.4814896",
    name: {
      en: "Tsaghveri",
      ka: "წაღვერი",
    },
    osm: "node:448860376",
  },
  {
    lat: "41.6159762",
    lon: "45.9703725",
    name: {
      en: "Tsnori",
      ka: "წნორი",
    },
    osm: "way:26389317",
  },
  {
    lat: "42.3284986",
    lon: "42.6003682",
    name: {
      en: "Tskaltubo",
      ka: "წყალტუბო",
    },
    osm: "relation:15617773",
  },
  {
    lat: "41.6986768",
    lon: "44.6975318",
    name: {
      en: "Tskneti",
      ka: "წკნელი",
    },
    osm: "relation:16068267",
  },
  {
    lat: "42.2903906",
    lon: "43.2811078",
    name: {
      en: "Chiatura",
      ka: "ჭიათურა",
    },
    osm: "relation:15842959",
  },
  {
    lat: "42.0223424",
    lon: "43.1936525",
    name: {
      en: "Kharagauli",
      ka: "ხარაგაული",
    },
    osm: "way:223666778",
  },
  {
    lat: "42.4143477",
    lon: "43.0457125",
    name: {
      en: "Kharistvala",
      ka: "ხარისთვალა",
    },
    osm: "node:7028862390",
  },
  {
    lat: "42.3195285",
    lon: "41.8999934",
    name: {
      en: "Khobi",
      ka: "ხობი",
    },
    osm: "node:389635184",
  },
  {
    lat: "42.3148824",
    lon: "42.4149487",
    name: {
      en: "Khoni",
      ka: "ხონი",
    },
    osm: "way:1213638082",
  },
  {
    lat: "41.6460816",
    lon: "42.3111341",
    name: {
      en: "Khulo",
      ka: "ხულო",
    },
    osm: "way:963347220",
  },
  {
    lat: "42.7090813",
    lon: "42.0490931",
    name: {
      en: "Jvari",
      ka: "ჯვარი",
    },
    osm: "node:3425542046",
  },
];





export const PLACE_MAP: Map<Place["osm"], Place> = new Map(
  PLACES.map((place) => [place.osm, place])
);

export default PLACES;
