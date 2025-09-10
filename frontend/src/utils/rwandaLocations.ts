// Rwanda Administrative Divisions Data
export interface Location {
  name: string;
  children?: Location[];
}

export const rwandaLocations: Location[] = [
  {
    name: 'Kigali City',
    children: [
      {
        name: 'Gasabo',
        children: [
          {
            name: 'Bumbogo',
            children: [
              { name: 'Bukure', children: [{ name: 'Biryogo' }, { name: 'Bukure' }, { name: 'Rwimbogo' }] },
              { name: 'Gitikinyoni', children: [{ name: 'Gitikinyoni' }, { name: 'Nyamata' }, { name: 'Rugando' }] },
              { name: 'Rutunga', children: [{ name: 'Kanyinya' }, { name: 'Rutunga' }, { name: 'Shyorongi' }] }
            ]
          },
          {
            name: 'Gatsata',
            children: [
              { name: 'Cyahafi', children: [{ name: 'Cyahafi' }, { name: 'Kinyinya' }, { name: 'Rusororo' }] },
              { name: 'Gatsata', children: [{ name: 'Gatsata' }, { name: 'Jarama' }, { name: 'Rusororo' }] },
              { name: 'Kimisagara', children: [{ name: 'Kimisagara' }, { name: 'Rwandex' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Remera',
            children: [
              { name: 'Gisimenti', children: [{ name: 'Gisimenti' }, { name: 'Kagugu' }, { name: 'Nyarutarama' }] },
              { name: 'Ubumwe', children: [{ name: 'Ubumwe' }, { name: 'Urugwiro' }, { name: 'Village Urugwiro' }] },
              { name: 'Rukiri I', children: [{ name: 'Rukiri I' }, { name: 'Kimihurura' }, { name: 'Nyarutarama' }] },
              { name: 'Rukiri II', children: [{ name: 'Rukiri II' }, { name: 'Gacuriro' }, { name: 'Kagugu' }] }
            ]
          },
          {
            name: 'Kimironko',
            children: [
              { name: 'Bibare', children: [{ name: 'Bibare' }, { name: 'Kagugu' }, { name: 'Nyarutarama' }] },
              { name: 'Kibagabaga', children: [{ name: 'Kibagabaga' }, { name: 'Nyarutarama' }, { name: 'Ubumwe' }] },
              { name: 'Kimironko', children: [{ name: 'Kimironko' }, { name: 'Nyarurama' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Gikomero',
            children: [
              { name: 'Cyanya', children: [{ name: 'Cyanya' }, { name: 'Gacuriro' }, { name: 'Rutunga' }] },
              { name: 'Murama', children: [{ name: 'Murama' }, { name: 'Nyabisindu' }, { name: 'Shyorongi' }] },
              { name: 'Rushashi', children: [{ name: 'Rushashi' }, { name: 'Rutunga' }, { name: 'Shyorongi' }] }
            ]
          },
          {
            name: 'Jali',
            children: [
              { name: 'Bugarama', children: [{ name: 'Bugarama' }, { name: 'Jali' }, { name: 'Rutunga' }] },
              { name: 'Jali', children: [{ name: 'Jali' }, { name: 'Nyabisindu' }, { name: 'Shyorongi' }] },
              { name: 'Munyiginya', children: [{ name: 'Munyiginya' }, { name: 'Rutunga' }, { name: 'Shyorongi' }] }
            ]
          },
          {
            name: 'Kinyinya',
            children: [
              { name: 'Gasogi', children: [{ name: 'Gasogi' }, { name: 'Kinyinya' }, { name: 'Ubumwe' }] },
              { name: 'Kinyinya', children: [{ name: 'Kinyinya' }, { name: 'Nyarutarama' }, { name: 'Ubumwe' }] },
              { name: 'Musezero', children: [{ name: 'Musezero' }, { name: 'Nyarutarama' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Ndera',
            children: [
              { name: 'Busanza', children: [{ name: 'Busanza' }, { name: 'Ndera' }, { name: 'Rutunga' }] },
              { name: 'Ndera', children: [{ name: 'Ndera' }, { name: 'Rutunga' }, { name: 'Shyorongi' }] },
              { name: 'Rwezamenyo', children: [{ name: 'Rwezamenyo' }, { name: 'Shyorongi' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Rusororo',
            children: [
              { name: 'Gihogwe', children: [{ name: 'Gihogwe' }, { name: 'Rusororo' }, { name: 'Shyorongi' }] },
              { name: 'Rusororo', children: [{ name: 'Rusororo' }, { name: 'Shyorongi' }, { name: 'Ubumwe' }] },
              { name: 'Rwimbogo', children: [{ name: 'Rwimbogo' }, { name: 'Shyorongi' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Rutunga',
            children: [
              { name: 'Gashenyi', children: [{ name: 'Gashenyi' }, { name: 'Rutunga' }, { name: 'Ubumwe' }] },
              { name: 'Rutunga', children: [{ name: 'Rutunga' }, { name: 'Shyorongi' }, { name: 'Ubumwe' }] },
              { name: 'Shyorongi', children: [{ name: 'Shyorongi' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          }
        ]
      },
      {
        name: 'Kicukiro',
        children: [
          {
            name: 'Gahanga',
            children: [
              { name: 'Gahanga', children: [{ name: 'Gahanga' }, { name: 'Kabuye' }, { name: 'Rebero' }] },
              { name: 'Karenge', children: [{ name: 'Karenge' }, { name: 'Kagarama' }, { name: 'Rebero' }] },
              { name: 'Shyogwe', children: [{ name: 'Shyogwe' }, { name: 'Kagarama' }, { name: 'Rebero' }] }
            ]
          },
          {
            name: 'Gatenga',
            children: [
              { name: 'Gatenga', children: [{ name: 'Gatenga' }, { name: 'Kagarama' }, { name: 'Nyarugunga' }] },
              { name: 'Kagarama', children: [{ name: 'Kagarama' }, { name: 'Nyarugunga' }, { name: 'Rebero' }] },
              { name: 'Kigarama', children: [{ name: 'Kigarama' }, { name: 'Nyarugunga' }, { name: 'Rebero' }] }
            ]
          },
          {
            name: 'Kagarama',
            children: [
              { name: 'Gikondo', children: [{ name: 'Gikondo' }, { name: 'Kagarama' }, { name: 'Nyarugunga' }] },
              { name: 'Kagarama', children: [{ name: 'Kagarama' }, { name: 'Nyarugunga' }, { name: 'Sonatube' }] },
              { name: 'Nyarugunga', children: [{ name: 'Nyarugunga' }, { name: 'Sonatube' }, { name: 'Zindiro' }] }
            ]
          },
          {
            name: 'Kanombe',
            children: [
              { name: 'Busogo', children: [{ name: 'Busogo' }, { name: 'Kanombe' }, { name: 'Nyarugunga' }] },
              { name: 'Kanombe', children: [{ name: 'Kanombe' }, { name: 'Nyarugunga' }, { name: 'Zindiro' }] },
              { name: 'Rugando', children: [{ name: 'Rugando' }, { name: 'Nyarugunga' }, { name: 'Zindiro' }] }
            ]
          },
          {
            name: 'Kicukiro',
            children: [
              { name: 'Gakinjiro', children: [{ name: 'Gakinjiro' }, { name: 'Kicukiro' }, { name: 'Nyarugunga' }] },
              { name: 'Kicukiro', children: [{ name: 'Kicukiro' }, { name: 'Nyarugunga' }, { name: 'Sonatube' }] },
              { name: 'Niboye', children: [{ name: 'Niboye' }, { name: 'Nyarugunga' }, { name: 'Sonatube' }] }
            ]
          },
          {
            name: 'Niboye',
            children: [
              { name: 'Kabuye', children: [{ name: 'Kabuye' }, { name: 'Niboye' }, { name: 'Sonatube' }] },
              { name: 'Niboye', children: [{ name: 'Niboye' }, { name: 'Sonatube' }, { name: 'Zindiro' }] },
              { name: 'Ruhango', children: [{ name: 'Ruhango' }, { name: 'Sonatube' }, { name: 'Zindiro' }] }
            ]
          }
        ]
      },
      {
        name: 'Nyarugenge',
        children: [
          {
            name: 'Gitega',
            children: [
              { name: 'Gitega', children: [{ name: 'Gitega' }, { name: 'Rugenge' }, { name: 'Rwezamenyo' }] },
              { name: 'Rugenge', children: [{ name: 'Rugenge' }, { name: 'Rwezamenyo' }, { name: 'Ubumwe' }] },
              { name: 'Rwezamenyo', children: [{ name: 'Rwezamenyo' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          },
          {
            name: 'Kanyinya',
            children: [
              { name: 'Kanyinya', children: [{ name: 'Kanyinya' }, { name: 'Muhima' }, { name: 'Nyakabanda' }] },
              { name: 'Muhima', children: [{ name: 'Muhima' }, { name: 'Nyakabanda' }, { name: 'Nyamirambo' }] },
              { name: 'Nyakabanda', children: [{ name: 'Nyakabanda' }, { name: 'Nyamirambo' }, { name: 'Rugenge' }] }
            ]
          },
          {
            name: 'Kigali',
            children: [
              { name: 'Biryogo', children: [{ name: 'Biryogo' }, { name: 'Kigali' }, { name: 'Nyarugenge' }] },
              { name: 'Kigali', children: [{ name: 'Kigali' }, { name: 'Nyarugenge' }, { name: 'Rugenge' }] },
              { name: 'Nyarugenge', children: [{ name: 'Nyarugenge' }, { name: 'Rugenge' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Kimisagara',
            children: [
              { name: 'Gikondo', children: [{ name: 'Gikondo' }, { name: 'Kimisagara' }, { name: 'Nyabugogo' }] },
              { name: 'Kimisagara', children: [{ name: 'Kimisagara' }, { name: 'Nyabugogo' }, { name: 'Rugenge' }] },
              { name: 'Nyabugogo', children: [{ name: 'Nyabugogo' }, { name: 'Rugenge' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Mageragere',
            children: [
              { name: 'Mageragere', children: [{ name: 'Mageragere' }, { name: 'Nyamabuye' }, { name: 'Rugenge' }] },
              { name: 'Nyamabuye', children: [{ name: 'Nyamabuye' }, { name: 'Rugenge' }, { name: 'Ubumwe' }] },
              { name: 'Rugenge', children: [{ name: 'Rugenge' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          },
          {
            name: 'Muhima',
            children: [
              { name: 'Muhima', children: [{ name: 'Muhima' }, { name: 'Nyakabanda' }, { name: 'Rugenge' }] },
              { name: 'Nyakabanda', children: [{ name: 'Nyakabanda' }, { name: 'Nyamirambo' }, { name: 'Rugenge' }] },
              { name: 'Rugenge', children: [{ name: 'Rugenge' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          },
          {
            name: 'Nyakabanda',
            children: [
              { name: 'Cyahafi', children: [{ name: 'Cyahafi' }, { name: 'Nyakabanda' }, { name: 'Nyamirambo' }] },
              { name: 'Nyakabanda', children: [{ name: 'Nyakabanda' }, { name: 'Nyamirambo' }, { name: 'Rugenge' }] },
              { name: 'Nyamirambo', children: [{ name: 'Nyamirambo' }, { name: 'Rugenge' }, { name: 'Ubumwe' }] }
            ]
          },
          {
            name: 'Nyamirambo',
            children: [
              { name: 'Muhima', children: [{ name: 'Muhima' }, { name: 'Nyamirambo' }, { name: 'Rugenge' }] },
              { name: 'Nyamirambo', children: [{ name: 'Nyamirambo' }, { name: 'Rugenge' }, { name: 'Ubumwe' }] },
              { name: 'Rwezamenyo', children: [{ name: 'Rwezamenyo' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          },
          {
            name: 'Rwezamenyo',
            children: [
              { name: 'Gitega', children: [{ name: 'Gitega' }, { name: 'Rugenge' }, { name: 'Rwezamenyo' }] },
              { name: 'Rugenge', children: [{ name: 'Rugenge' }, { name: 'Rwezamenyo' }, { name: 'Ubumwe' }] },
              { name: 'Rwezamenyo', children: [{ name: 'Rwezamenyo' }, { name: 'Ubumwe' }, { name: 'Urugwiro' }] }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Southern Province',
    children: [
      {
        name: 'Huye',
        children: [
          {
            name: 'Gisagara',
            children: [
              { name: 'Gisagara', children: [{ name: 'Gisagara' }, { name: 'Kigembe' }, { name: 'Ruhango' }] },
              { name: 'Kigembe', children: [{ name: 'Kigembe' }, { name: 'Mukindo' }, { name: 'Ruhango' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Huye',
            children: [
              { name: 'Matyazo', children: [{ name: 'Matyazo' }, { name: 'Ngoma' }, { name: 'Tumba' }] },
              { name: 'Ngoma', children: [{ name: 'Ngoma' }, { name: 'Ruhashya' }, { name: 'Tumba' }] },
              { name: 'Tumba', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Karama',
            children: [
              { name: 'Cyahinda', children: [{ name: 'Cyahinda' }, { name: 'Karama' }, { name: 'Rusatira' }] },
              { name: 'Karama', children: [{ name: 'Karama' }, { name: 'Rusatira' }, { name: 'Rwaniro' }] },
              { name: 'Rusatira', children: [{ name: 'Rusatira' }, { name: 'Rwaniro' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Kigoma',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Kigoma' }, { name: 'Rusatira' }] },
              { name: 'Kigoma', children: [{ name: 'Kigoma' }, { name: 'Mubuga' }, { name: 'Rusatira' }] },
              { name: 'Mubuga', children: [{ name: 'Mubuga' }, { name: 'Rusatira' }, { name: 'Rwaniro' }] }
            ]
          },
          {
            name: 'Kinazi',
            children: [
              { name: 'Kinazi', children: [{ name: 'Kinazi' }, { name: 'Rwaniro' }, { name: 'Save' }] },
              { name: 'Mubuga', children: [{ name: 'Mubuga' }, { name: 'Rwaniro' }, { name: 'Save' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Rwaniro' }] }
            ]
          },
          {
            name: 'Maraba',
            children: [
              { name: 'Gasaka', children: [{ name: 'Gasaka' }, { name: 'Maraba' }, { name: 'Nyakibanda' }] },
              { name: 'Maraba', children: [{ name: 'Maraba' }, { name: 'Nyakibanda' }, { name: 'Rango' }] },
              { name: 'Nyakibanda', children: [{ name: 'Nyakibanda' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Mbazi',
            children: [
              { name: 'Cyarwa', children: [{ name: 'Cyarwa' }, { name: 'Mbazi' }, { name: 'Tumba' }] },
              { name: 'Mbazi', children: [{ name: 'Mbazi' }, { name: 'Rango' }, { name: 'Tumba' }] },
              { name: 'Rango', children: [{ name: 'Rango' }, { name: 'Tumba' }, { name: 'Cyarwa' }] }
            ]
          },
          {
            name: 'Mukura',
            children: [
              { name: 'Gasaka', children: [{ name: 'Gasaka' }, { name: 'Mukura' }, { name: 'Ruhashya' }] },
              { name: 'Mukura', children: [{ name: 'Mukura' }, { name: 'Nyakibanda' }, { name: 'Ruhashya' }] },
              { name: 'Ruhashya', children: [{ name: 'Ngoma' }, { name: 'Ruhashya' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Ngoma',
            children: [
              { name: 'Cyahinda', children: [{ name: 'Cyahinda' }, { name: 'Ngoma' }, { name: 'Ruhashya' }] },
              { name: 'Ngoma', children: [{ name: 'Ngoma' }, { name: 'Ruhashya' }, { name: 'Tumba' }] },
              { name: 'Ruhashya', children: [{ name: 'Ngoma' }, { name: 'Ruhashya' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Ruhashya',
            children: [
              { name: 'Cyahinda', children: [{ name: 'Cyahinda' }, { name: 'Ngoma' }, { name: 'Ruhashya' }] },
              { name: 'Ruhashya', children: [{ name: 'Ngoma' }, { name: 'Ruhashya' }, { name: 'Tumba' }] },
              { name: 'Tumba', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Rusatira',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Rusatira' }, { name: 'Rwaniro' }] },
              { name: 'Rusatira', children: [{ name: 'Rusatira' }, { name: 'Rwaniro' }, { name: 'Save' }] },
              { name: 'Rwaniro', children: [{ name: 'Rwaniro' }, { name: 'Save' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Rwaniro',
            children: [
              { name: 'Kinazi', children: [{ name: 'Kinazi' }, { name: 'Rwaniro' }, { name: 'Save' }] },
              { name: 'Rwaniro', children: [{ name: 'Rwaniro' }, { name: 'Save' }, { name: 'Tumba' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Kinazi' }] }
            ]
          },
          {
            name: 'Simbi',
            children: [
              { name: 'Cyarwa', children: [{ name: 'Cyarwa' }, { name: 'Simbi' }, { name: 'Tumba' }] },
              { name: 'Simbi', children: [{ name: 'Rango' }, { name: 'Simbi' }, { name: 'Tumba' }] },
              { name: 'Tumba', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          },
          {
            name: 'Tumba',
            children: [
              { name: 'Cyarwa', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] },
              { name: 'Rango', children: [{ name: 'Rango' }, { name: 'Tumba' }, { name: 'Cyarwa' }] },
              { name: 'Tumba', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          }
        ]
      },
      {
        name: 'Muhanga',
        children: [
          {
            name: 'Cyeza',
            children: [
              { name: 'Kibangu', children: [{ name: 'Kibangu' }, { name: 'Nyarusange' }, { name: 'Rwinzovu' }] },
              { name: 'Nyarusange', children: [{ name: 'Nyarusange' }, { name: 'Rwinzovu' }, { name: 'Shyogwe' }] },
              { name: 'Rwinzovu', children: [{ name: 'Rwinzovu' }, { name: 'Shyogwe' }, { name: 'Kibangu' }] }
            ]
          },
          {
            name: 'Kabacuzi',
            children: [
              { name: 'Kabacuzi', children: [{ name: 'Kabacuzi' }, { name: 'Nyamabuye' }, { name: 'Rugendabari' }] },
              { name: 'Nyamabuye', children: [{ name: 'Nyamabuye' }, { name: 'Rugendabari' }, { name: 'Shyogwe' }] },
              { name: 'Rugendabari', children: [{ name: 'Rugendabari' }, { name: 'Shyogwe' }, { name: 'Kabacuzi' }] }
            ]
          },
          {
            name: 'Kiyumba',
            children: [
              { name: 'Gitarama', children: [{ name: 'Gitarama' }, { name: 'Kiyumba' }, { name: 'Mushishiro' }] },
              { name: 'Kiyumba', children: [{ name: 'Kiyumba' }, { name: 'Mushishiro' }, { name: 'Nyamabuye' }] },
              { name: 'Mushishiro', children: [{ name: 'Mushishiro' }, { name: 'Nyamabuye' }, { name: 'Gitarama' }] }
            ]
          },
          {
            name: 'Muhanga',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Muhanga' }, { name: 'Nyamabuye' }] },
              { name: 'Muhanga', children: [{ name: 'Muhanga' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] },
              { name: 'Nyamabuye', children: [{ name: 'Muhanga' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] }
            ]
          },
          {
            name: 'Mushishiro',
            children: [
              { name: 'Gitarama', children: [{ name: 'Gitarama' }, { name: 'Mushishiro' }, { name: 'Nyamabuye' }] },
              { name: 'Mushishiro', children: [{ name: 'Mushishiro' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Gitarama' }] }
            ]
          },
          {
            name: 'Nyabingi',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Nyabingi' }, { name: 'Shyogwe' }] },
              { name: 'Nyabingi', children: [{ name: 'Nyabingi' }, { name: 'Shyogwe' }, { name: 'Rwabicuma' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Cyeza' }] }
            ]
          },
          {
            name: 'Nyamabuye',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Muhanga' }, { name: 'Nyamabuye' }] },
              { name: 'Nyamabuye', children: [{ name: 'Muhanga' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Muhanga' }] }
            ]
          },
          {
            name: 'Rongi',
            children: [
              { name: 'Gitarama', children: [{ name: 'Gitarama' }, { name: 'Rongi' }, { name: 'Shyogwe' }] },
              { name: 'Rongi', children: [{ name: 'Rongi' }, { name: 'Shyogwe' }, { name: 'Nyamabuye' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Gitarama' }] }
            ]
          },
          {
            name: 'Rugendabari',
            children: [
              { name: 'Kabacuzi', children: [{ name: 'Kabacuzi' }, { name: 'Rugendabari' }, { name: 'Shyogwe' }] },
              { name: 'Rugendabari', children: [{ name: 'Rugendabari' }, { name: 'Shyogwe' }, { name: 'Nyamabuye' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Kabacuzi' }] }
            ]
          },
          {
            name: 'Shyogwe',
            children: [
              { name: 'Cyeza', children: [{ name: 'Cyeza' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] },
              { name: 'Nyamabuye', children: [{ name: 'Muhanga' }, { name: 'Nyamabuye' }, { name: 'Shyogwe' }] },
              { name: 'Shyogwe', children: [{ name: 'Nyamabuye' }, { name: 'Shyogwe' }, { name: 'Cyeza' }] }
            ]
          }
        ]
      },
      {
        name: 'Nyanza',
        children: [
          {
            name: 'Busasamana',
            children: [
              { name: 'Busasamana', children: [{ name: 'Busasamana' }, { name: 'Kibirizi' }, { name: 'Nyanza' }] },
              { name: 'Kibirizi', children: [{ name: 'Kibirizi' }, { name: 'Nyanza' }, { name: 'Rwabicuma' }] },
              { name: 'Nyanza', children: [{ name: 'Nyanza' }, { name: 'Rwabicuma' }, { name: 'Busasamana' }] }
            ]
          },
          {
            name: 'Busoro',
            children: [
              { name: 'Busoro', children: [{ name: 'Busoro' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] },
              { name: 'Nyabingi', children: [{ name: 'Nyabingi' }, { name: 'Rwabicuma' }, { name: 'Cyahinda' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] }
            ]
          },
          {
            name: 'Cyabakamyi',
            children: [
              { name: 'Cyabakamyi', children: [{ name: 'Cyabakamyi' }, { name: 'Mukingo' }, { name: 'Rwabicuma' }] },
              { name: 'Mukingo', children: [{ name: 'Cyahinda' }, { name: 'Mukingo' }, { name: 'Rwabicuma' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] }
            ]
          },
          {
            name: 'Kigoma',
            children: [
              { name: 'Kigoma', children: [{ name: 'Kigoma' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] },
              { name: 'Nyabingi', children: [{ name: 'Nyabingi' }, { name: 'Rwabicuma' }, { name: 'Cyahinda' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] }
            ]
          },
          {
            name: 'Kibirizi',
            children: [
              { name: 'Busasamana', children: [{ name: 'Busasamana' }, { name: 'Kibirizi' }, { name: 'Nyanza' }] },
              { name: 'Kibirizi', children: [{ name: 'Kibirizi' }, { name: 'Nyanza' }, { name: 'Rwabicuma' }] },
              { name: 'Nyanza', children: [{ name: 'Nyanza' }, { name: 'Rwabicuma' }, { name: 'Busasamana' }] }
            ]
          },
          {
            name: 'Mukingo',
            children: [
              { name: 'Cyahinda', children: [{ name: 'Cyahinda' }, { name: 'Mukingo' }, { name: 'Rwabicuma' }] },
              { name: 'Mukingo', children: [{ name: 'Cyahinda' }, { name: 'Mukingo' }, { name: 'Rwabicuma' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] }
            ]
          },
          {
            name: 'Nyanza',
            children: [
              { name: 'Nyanza', children: [{ name: 'Nyanza' }, { name: 'Rwabicuma' }, { name: 'Nyabingi' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] },
              { name: 'Nyabingi', children: [{ name: 'Nyabingi' }, { name: 'Rwabicuma' }, { name: 'Cyahinda' }] }
            ]
          },
          {
            name: 'Rwabicuma',
            children: [
              { name: 'Nyanza', children: [{ name: 'Nyanza' }, { name: 'Rwabicuma' }, { name: 'Nyabingi' }] },
              { name: 'Rwabicuma', children: [{ name: 'Nyanza' }, { name: 'Nyabingi' }, { name: 'Rwabicuma' }] },
              { name: 'Nyabingi', children: [{ name: 'Nyabingi' }, { name: 'Rwabicuma' }, { name: 'Cyahinda' }] }
            ]
          }
        ]
      },
      {
        name: 'Gisagara',
        children: [
          {
            name: 'Gisagara',
            children: [
              { name: 'Gisagara', children: [{ name: 'Gisagara' }, { name: 'Kigembe' }, { name: 'Ruhango' }] },
              { name: 'Kigembe', children: [{ name: 'Kigembe' }, { name: 'Mukindo' }, { name: 'Ruhango' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Gikonko',
            children: [
              { name: 'Gikonko', children: [{ name: 'Gikonko' }, { name: 'Mukindo' }, { name: 'Save' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Gikonko' }] }
            ]
          },
          {
            name: 'Kansi',
            children: [
              { name: 'Kansi', children: [{ name: 'Kansi' }, { name: 'Kigembe' }, { name: 'Mukindo' }] },
              { name: 'Kigembe', children: [{ name: 'Kigembe' }, { name: 'Mukindo' }, { name: 'Ruhango' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Kibirizi',
            children: [
              { name: 'Kansi', children: [{ name: 'Kansi' }, { name: 'Kibirizi' }, { name: 'Mukindo' }] },
              { name: 'Kibirizi', children: [{ name: 'Kibirizi' }, { name: 'Mukindo' }, { name: 'Save' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Kigembe',
            children: [
              { name: 'Gisagara', children: [{ name: 'Gisagara' }, { name: 'Kigembe' }, { name: 'Ruhango' }] },
              { name: 'Kigembe', children: [{ name: 'Kigembe' }, { name: 'Mukindo' }, { name: 'Ruhango' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Muganza',
            children: [
              { name: 'Kansi', children: [{ name: 'Kansi' }, { name: 'Muganza' }, { name: 'Mukindo' }] },
              { name: 'Muganza', children: [{ name: 'Muganza' }, { name: 'Mukindo' }, { name: 'Save' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] }
            ]
          },
          {
            name: 'Mukindo',
            children: [
              { name: 'Kigembe', children: [{ name: 'Kigembe' }, { name: 'Mukindo' }, { name: 'Ruhango' }] },
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Mukindo' }] }
            ]
          },
          {
            name: 'Ndora',
            children: [
              { name: 'Kansi', children: [{ name: 'Kansi' }, { name: 'Ndora' }, { name: 'Save' }] },
              { name: 'Ndora', children: [{ name: 'Ndora' }, { name: 'Save' }, { name: 'Tumba' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Kansi' }] }
            ]
          },
          {
            name: 'Save',
            children: [
              { name: 'Mukindo', children: [{ name: 'Mukindo' }, { name: 'Ruhango' }, { name: 'Save' }] },
              { name: 'Save', children: [{ name: 'Save' }, { name: 'Tumba' }, { name: 'Mukindo' }] },
              { name: 'Tumba', children: [{ name: 'Cyarwa' }, { name: 'Rango' }, { name: 'Tumba' }] }
            ]
          }
        ]
      },
      {
        name: 'Kamonyi',
        children: [
          {
            name: 'Gacurabwenge',
            children: [
              { name: 'Gacurabwenge', children: [{ name: 'Gacurabwenge' }, { name: 'Kamonyi' }, { name: 'Rukoma' }] },
              { name: 'Kamonyi', children: [{ name: 'Kamonyi' }, { name: 'Rukoma' }, { name: 'Runda' }] },
              { name: 'Rukoma', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Gacurabwenge' }] }
            ]
          },
          {
            name: 'Kamonyi',
            children: [
              { name: 'Gacurabwenge', children: [{ name: 'Gacurabwenge' }, { name: 'Kamonyi' }, { name: 'Rukoma' }] },
              { name: 'Kamonyi', children: [{ name: 'Kamonyi' }, { name: 'Rukoma' }, { name: 'Runda' }] },
              { name: 'Rukoma', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Gacurabwenge' }] }
            ]
          },
          {
            name: 'Kayenzi',
            children: [
              { name: 'Kayenzi', children: [{ name: 'Kayenzi' }, { name: 'Mukingo' }, { name: 'Runda' }] },
              { name: 'Mukingo', children: [{ name: 'Cyahinda' }, { name: 'Mukingo' }, { name: 'Rwabicuma' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Kayenzi' }] }
            ]
          },
          {
            name: 'Kayumbu',
            children: [
              { name: 'Kayumbu', children: [{ name: 'Kayumbu' }, { name: 'Mugina' }, { name: 'Runda' }] },
              { name: 'Mugina', children: [{ name: 'Mugina' }, { name: 'Runda' }, { name: 'Nyarubaka' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Kayumbu' }] }
            ]
          },
          {
            name: 'Mugina',
            children: [
              { name: 'Kayumbu', children: [{ name: 'Kayumbu' }, { name: 'Mugina' }, { name: 'Runda' }] },
              { name: 'Mugina', children: [{ name: 'Mugina' }, { name: 'Runda' }, { name: 'Nyarubaka' }] },
              { name: 'Nyarubaka', children: [{ name: 'Nyarubaka' }, { name: 'Runda' }, { name: 'Mugina' }] }
            ]
          },
          {
            name: 'Musambira',
            children: [
              { name: 'Kayumbu', children: [{ name: 'Kayumbu' }, { name: 'Musambira' }, { name: 'Runda' }] },
              { name: 'Musambira', children: [{ name: 'Musambira' }, { name: 'Nyarubaka' }, { name: 'Runda' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Musambira' }] }
            ]
          },
          {
            name: 'Nyamiyaga',
            children: [
              { name: 'Kayumbu', children: [{ name: 'Kayumbu' }, { name: 'Nyamiyaga' }, { name: 'Runda' }] },
              { name: 'Nyamiyaga', children: [{ name: 'Nyamiyaga' }, { name: 'Runda' }, { name: 'Nyarubaka' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Nyamiyaga' }] }
            ]
          },
          {
            name: 'Nyarubaka',
            children: [
              { name: 'Mugina', children: [{ name: 'Mugina' }, { name: 'Nyarubaka' }, { name: 'Runda' }] },
              { name: 'Nyarubaka', children: [{ name: 'Nyarubaka' }, { name: 'Runda' }, { name: 'Mugina' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Nyarubaka' }] }
            ]
          },
          {
            name: 'Rukoma',
            children: [
              { name: 'Gacurabwenge', children: [{ name: 'Gacurabwenge' }, { name: 'Kamonyi' }, { name: 'Rukoma' }] },
              { name: 'Rukoma', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Gacurabwenge' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Kamonyi' }] }
            ]
          },
          {
            name: 'Runda',
            children: [
              { name: 'Kamonyi', children: [{ name: 'Kamonyi' }, { name: 'Rukoma' }, { name: 'Runda' }] },
              { name: 'Rukoma', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Gacurabwenge' }] },
              { name: 'Runda', children: [{ name: 'Rukoma' }, { name: 'Runda' }, { name: 'Kamonyi' }] }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Western Province',
    children: [
      {
        name: 'Rusizi',
        children: [
          {
            name: 'Butare',
            children: [
              { name: 'Butare', children: [{ name: 'Butare' }, { name: 'Kamembe' }, { name: 'Rusizi' }] },
              { name: 'Kamembe', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Rusizi', children: [{ name: 'Butare' }, { name: 'Kamembe' }, { name: 'Rusizi' }] }
            ]
          },
          {
            name: 'Bugarama',
            children: [
              { name: 'Bugarama', children: [{ name: 'Bugarama' }, { name: 'Nyakabuye' }, { name: 'Ruhwa' }] },
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Rwimbogo' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Bugarama' }] }
            ]
          },
          {
            name: 'Bukunzi',
            children: [
              { name: 'Bukunzi', children: [{ name: 'Bukunzi' }, { name: 'Gashonga' }, { name: 'Nyakabuye' }] },
              { name: 'Gashonga', children: [{ name: 'Gashonga' }, { name: 'Nyakabuye' }, { name: 'Ruhwa' }] },
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Bukunzi' }] }
            ]
          },
          {
            name: 'Gashonga',
            children: [
              { name: 'Bukunzi', children: [{ name: 'Bukunzi' }, { name: 'Gashonga' }, { name: 'Nyakabuye' }] },
              { name: 'Gashonga', children: [{ name: 'Gashonga' }, { name: 'Nyakabuye' }, { name: 'Ruhwa' }] },
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Gashonga' }] }
            ]
          },
          {
            name: 'Gikundamvura',
            children: [
              { name: 'Gikundamvura', children: [{ name: 'Gikundamvura' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Kamembe', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Nkungu', children: [{ name: 'Kamembe' }, { name: 'Nkungu' }, { name: 'Gikundamvura' }] }
            ]
          },
          {
            name: 'Kamembe',
            children: [
              { name: 'Cyangugu', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Kamembe', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Nkungu', children: [{ name: 'Kamembe' }, { name: 'Nkungu' }, { name: 'Cyangugu' }] }
            ]
          },
          {
            name: 'Muganza',
            children: [
              { name: 'Muganza', children: [{ name: 'Muganza' }, { name: 'Nyakabuye' }, { name: 'Ruhwa' }] },
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Rwimbogo' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Muganza' }] }
            ]
          },
          {
            name: 'Mururu',
            children: [
              { name: 'Gashonga', children: [{ name: 'Gashonga' }, { name: 'Mururu' }, { name: 'Ruhwa' }] },
              { name: 'Mururu', children: [{ name: 'Mururu' }, { name: 'Ruhwa' }, { name: 'Nyakabuye' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Mururu' }] }
            ]
          },
          {
            name: 'Nkanka',
            children: [
              { name: 'Cyangugu', children: [{ name: 'Cyangugu' }, { name: 'Nkanka' }, { name: 'Nkungu' }] },
              { name: 'Nkanka', children: [{ name: 'Nkanka' }, { name: 'Nkungu' }, { name: 'Rwimbogo' }] },
              { name: 'Nkungu', children: [{ name: 'Kamembe' }, { name: 'Nkungu' }, { name: 'Nkanka' }] }
            ]
          },
          {
            name: 'Nkungu',
            children: [
              { name: 'Kamembe', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] },
              { name: 'Nkungu', children: [{ name: 'Kamembe' }, { name: 'Nkungu' }, { name: 'Cyangugu' }] },
              { name: 'Cyangugu', children: [{ name: 'Cyangugu' }, { name: 'Kamembe' }, { name: 'Nkungu' }] }
            ]
          },
          {
            name: 'Nyakabuye',
            children: [
              { name: 'Bugarama', children: [{ name: 'Bugarama' }, { name: 'Nyakabuye' }, { name: 'Ruhwa' }] },
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Rwimbogo' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Nyakabuye' }] }
            ]
          },
          {
            name: 'Nyakarenzo',
            children: [
              { name: 'Gashonga', children: [{ name: 'Gashonga' }, { name: 'Nyakarenzo' }, { name: 'Ruhwa' }] },
              { name: 'Nyakarenzo', children: [{ name: 'Nyakarenzo' }, { name: 'Ruhwa' }, { name: 'Rwimbogo' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Nyakarenzo' }] }
            ]
          },
          {
            name: 'Rwimbogo',
            children: [
              { name: 'Nyakabuye', children: [{ name: 'Nyakabuye' }, { name: 'Ruhwa' }, { name: 'Rwimbogo' }] },
              { name: 'Rwimbogo', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Nyakabuye' }] },
              { name: 'Ruhwa', children: [{ name: 'Ruhwa' }, { name: 'Rwimbogo' }, { name: 'Nyakabuye' }] }
            ]
          }
        ]
      },
      {
        name: 'Nyamasheke',
        children: [
          {
            name: 'Bushekeri',
            children: [
              { name: 'Bushekeri', children: [{ name: 'Bushekeri' }, { name: 'Cyato' }, { name: 'Nyabitekeri' }] },
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Nyabitekeri', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Bushekeri' }] }
            ]
          },
          {
            name: 'Bushenge',
            children: [
              { name: 'Bushenge', children: [{ name: 'Bushenge' }, { name: 'Cyato' }, { name: 'Rangiro' }] },
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Bushenge' }] }
            ]
          },
          {
            name: 'Cyato',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Nyabitekeri', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] }
            ]
          },
          {
            name: 'Gihombo',
            children: [
              { name: 'Gihombo', children: [{ name: 'Gihombo' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Nyabitekeri', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Gihombo' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Gihombo' }] }
            ]
          },
          {
            name: 'Kagano',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Kagano' }, { name: 'Rangiro' }] },
              { name: 'Kagano', children: [{ name: 'Kagano' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Kagano' }] }
            ]
          },
          {
            name: 'Karengera',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Karengera' }, { name: 'Rangiro' }] },
              { name: 'Karengera', children: [{ name: 'Karengera' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Karengera' }] }
            ]
          },
          {
            name: 'Kanjongo',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Kanjongo' }, { name: 'Rangiro' }] },
              { name: 'Kanjongo', children: [{ name: 'Kanjongo' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Kanjongo' }] }
            ]
          },
          {
            name: 'Mahembe',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Mahembe' }, { name: 'Rangiro' }] },
              { name: 'Mahembe', children: [{ name: 'Mahembe' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Mahembe' }] }
            ]
          },
          {
            name: 'Nyabitekeri',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Nyabitekeri', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] }
            ]
          },
          {
            name: 'Rangiro',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Nyabitekeri' }, { name: 'Rangiro' }] },
              { name: 'Nyabitekeri', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Cyato' }] }
            ]
          },
          {
            name: 'Ruharambuga',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Ruharambuga' }, { name: 'Rangiro' }] },
              { name: 'Ruharambuga', children: [{ name: 'Ruharambuga' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Ruharambuga' }] }
            ]
          },
          {
            name: 'Shangi',
            children: [
              { name: 'Cyato', children: [{ name: 'Cyato' }, { name: 'Shangi' }, { name: 'Rangiro' }] },
              { name: 'Shangi', children: [{ name: 'Shangi' }, { name: 'Rangiro' }, { name: 'Nyabitekeri' }] },
              { name: 'Rangiro', children: [{ name: 'Nyabitekeri' }, { name: 'Rangiro' }, { name: 'Shangi' }] }
            ]
          }
        ]
      },
      {
        name: 'Karongi',
        children: [
          {
            name: 'Bwishyura',
            children: [
              { name: 'Bwishyura', children: [{ name: 'Bwishyura' }, { name: 'Karongi' }, { name: 'Rugabano' }] },
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Rugabano', children: [{ name: 'Rugabano' }, { name: 'Rwankuba' }, { name: 'Bwishyura' }] }
            ]
          },
          {
            name: 'Gishyita',
            children: [
              { name: 'Gishyita', children: [{ name: 'Gishyita' }, { name: 'Karongi' }, { name: 'Twimbogo' }] },
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Gishyita' }] }
            ]
          },
          {
            name: 'Gitesi',
            children: [
              { name: 'Gitesi', children: [{ name: 'Gitesi' }, { name: 'Karongi' }, { name: 'Twimbogo' }] },
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Gitesi' }] }
            ]
          },
          {
            name: 'Karongi',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Rugabano', children: [{ name: 'Rugabano' }, { name: 'Rwankuba' }, { name: 'Twimbogo' }] },
              { name: 'Rwankuba', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] }
            ]
          },
          {
            name: 'Murage',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Murage' }, { name: 'Twimbogo' }] },
              { name: 'Murage', children: [{ name: 'Murage' }, { name: 'Rugabano' }, { name: 'Twimbogo' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Murage' }] }
            ]
          },
          {
            name: 'Mutuntu',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Mutuntu' }, { name: 'Twimbogo' }] },
              { name: 'Mutuntu', children: [{ name: 'Mutuntu' }, { name: 'Rugabano' }, { name: 'Twimbogo' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Mutuntu' }] }
            ]
          },
          {
            name: 'Rugabano',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Rugabano', children: [{ name: 'Rugabano' }, { name: 'Rwankuba' }, { name: 'Twimbogo' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Rwankuba' }] }
            ]
          },
          {
            name: 'Ruganda',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Ruganda' }, { name: 'Twimbogo' }] },
              { name: 'Ruganda', children: [{ name: 'Ruganda' }, { name: 'Rugabano' }, { name: 'Twimbogo' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Ruganda' }] }
            ]
          },
          {
            name: 'Rwankuba',
            children: [
              { name: 'Karongi', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] },
              { name: 'Rugabano', children: [{ name: 'Rugabano' }, { name: 'Rwankuba' }, { name: 'Twimbogo' }] },
              { name: 'Rwankuba', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] }
            ]
          },
          {
            name: 'Twimbogo',
            children: [
              { name: 'Rugabano', children: [{ name: 'Rugabano' }, { name: 'Rwankuba' }, { name: 'Twimbogo' }] },
              { name: 'Twimbogo', children: [{ name: 'Rugabano' }, { name: 'Twimbogo' }, { name: 'Rwankuba' }] },
              { name: 'Rwankuba', children: [{ name: 'Karongi' }, { name: 'Rugabano' }, { name: 'Rwankuba' }] }
            ]
          }
        ]
      },
      {
        name: 'Rutsiro',
        children: [
          {
            name: 'Boneza',
            children: [
              { name: 'Boneza', children: [{ name: 'Boneza' }, { name: 'Gihango' }, { name: 'Kivumu' }] },
              { name: 'Gihango', children: [{ name: 'Gihango' }, { name: 'Kivumu' }, { name: 'Manihira' }] },
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Boneza' }] }
            ]
          },
          {
            name: 'Gihango',
            children: [
              { name: 'Boneza', children: [{ name: 'Boneza' }, { name: 'Gihango' }, { name: 'Kivumu' }] },
              { name: 'Gihango', children: [{ name: 'Gihango' }, { name: 'Kivumu' }, { name: 'Manihira' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Gihango' }] }
            ]
          },
          {
            name: 'Kigeyo',
            children: [
              { name: 'Kigeyo', children: [{ name: 'Kigeyo' }, { name: 'Kivumu' }, { name: 'Manihira' }] },
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Kigeyo' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Kigeyo' }] }
            ]
          },
          {
            name: 'Kivumu',
            children: [
              { name: 'Gihango', children: [{ name: 'Gihango' }, { name: 'Kivumu' }, { name: 'Manihira' }] },
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Gihango' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Gihango' }] }
            ]
          },
          {
            name: 'Manihira',
            children: [
              { name: 'Gihango', children: [{ name: 'Gihango' }, { name: 'Kivumu' }, { name: 'Manihira' }] },
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Gihango' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Gihango' }] }
            ]
          },
          {
            name: 'Mushonyi',
            children: [
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Mushonyi' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Mushonyi' }] },
              { name: 'Mushonyi', children: [{ name: 'Manihira' }, { name: 'Mushonyi' }, { name: 'Kivumu' }] }
            ]
          },
          {
            name: 'Mushubati',
            children: [
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Mushubati' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Mushubati' }] },
              { name: 'Mushubati', children: [{ name: 'Manihira' }, { name: 'Mushubati' }, { name: 'Kivumu' }] }
            ]
          },
          {
            name: 'Nyabirasi',
            children: [
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Nyabirasi' }, { name: 'Manihira' }] },
              { name: 'Nyabirasi', children: [{ name: 'Manihira' }, { name: 'Nyabirasi' }, { name: 'Kivumu' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Nyabirasi' }] }
            ]
          },
          {
            name: 'Ruhango',
            children: [
              { name: 'Kivumu', children: [{ name: 'Kivumu' }, { name: 'Ruhango' }, { name: 'Manihira' }] },
              { name: 'Ruhango', children: [{ name: 'Manihira' }, { name: 'Ruhango' }, { name: 'Kivumu' }] },
              { name: 'Manihira', children: [{ name: 'Kivumu' }, { name: 'Manihira' }, { name: 'Ruhango' }] }
            ]
          }
        ]
      },
      {
        name: 'Rubavu',
        children: [
          {
            name: 'Bugeshi',
            children: [
              { name: 'Bugeshi', children: [{ name: 'Bugeshi' }, { name: 'Gisenyi' }, { name: 'Rubavu' }] },
              { name: 'Gisenyi', children: [{ name: 'Gisenyi' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Bugeshi' }] }
            ]
          },
          {
            name: 'Busasamana',
            children: [
              { name: 'Busasamana', children: [{ name: 'Busasamana' }, { name: 'Kanama' }, { name: 'Nyundo' }] },
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Nyundo' }, { name: 'Rubavu' }] },
              { name: 'Nyundo', children: [{ name: 'Nyundo' }, { name: 'Rubavu' }, { name: 'Busasamana' }] }
            ]
          },
          {
            name: 'Gisenyi',
            children: [
              { name: 'Bugeshi', children: [{ name: 'Bugeshi' }, { name: 'Gisenyi' }, { name: 'Rubavu' }] },
              { name: 'Gisenyi', children: [{ name: 'Gisenyi' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Nyundo', children: [{ name: 'Nyundo' }, { name: 'Rubavu' }, { name: 'Gisenyi' }] }
            ]
          },
          {
            name: 'Kanama',
            children: [
              { name: 'Busasamana', children: [{ name: 'Busasamana' }, { name: 'Kanama' }, { name: 'Nyundo' }] },
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Nyundo' }, { name: 'Rubavu' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Kanama' }] }
            ]
          },
          {
            name: 'Kanzenze',
            children: [
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Kanzenze' }, { name: 'Rubavu' }] },
              { name: 'Kanzenze', children: [{ name: 'Kanzenze' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Kanzenze' }] }
            ]
          },
          {
            name: 'Mudende',
            children: [
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Mudende' }, { name: 'Rubavu' }] },
              { name: 'Mudende', children: [{ name: 'Mudende' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Mudende' }] }
            ]
          },
          {
            name: 'Nyakiliba',
            children: [
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Nyakiliba' }, { name: 'Rubavu' }] },
              { name: 'Nyakiliba', children: [{ name: 'Nyakiliba' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Nyakiliba' }] }
            ]
          },
          {
            name: 'Nyamyumba',
            children: [
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Nyamyumba' }, { name: 'Rubavu' }] },
              { name: 'Nyamyumba', children: [{ name: 'Nyamyumba' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Nyamyumba' }] }
            ]
          },
          {
            name: 'Nyundo',
            children: [
              { name: 'Gisenyi', children: [{ name: 'Gisenyi' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Nyundo', children: [{ name: 'Nyundo' }, { name: 'Rubavu' }, { name: 'Gisenyi' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Gisenyi' }] }
            ]
          },
          {
            name: 'Rubavu',
            children: [
              { name: 'Gisenyi', children: [{ name: 'Gisenyi' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Gisenyi' }] },
              { name: 'Nyundo', children: [{ name: 'Nyundo' }, { name: 'Rubavu' }, { name: 'Gisenyi' }] }
            ]
          },
          {
            name: 'Rugerero',
            children: [
              { name: 'Kanama', children: [{ name: 'Kanama' }, { name: 'Rugerero' }, { name: 'Rubavu' }] },
              { name: 'Rugerero', children: [{ name: 'Rugerero' }, { name: 'Rubavu' }, { name: 'Nyundo' }] },
              { name: 'Rubavu', children: [{ name: 'Rubavu' }, { name: 'Nyundo' }, { name: 'Rugerero' }] }
            ]
          }
        ]
      },
      {
        name: 'Ngororero',
        children: [
          {
            name: 'Bwira',
            children: [
              { name: 'Bwira', children: [{ name: 'Bwira' }, { name: 'Kabaya' }, { name: 'Ndaro' }] },
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Ndaro' }, { name: 'Nyange' }] },
              { name: 'Ndaro', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Bwira' }] }
            ]
          },
          {
            name: 'Kabaya',
            children: [
              { name: 'Bwira', children: [{ name: 'Bwira' }, { name: 'Kabaya' }, { name: 'Ndaro' }] },
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Ndaro' }, { name: 'Nyange' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Kabaya' }] }
            ]
          },
          {
            name: 'Kageyo',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Kageyo' }, { name: 'Nyange' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Kageyo' }] }
            ]
          },
          {
            name: 'Kavumu',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Kavumu' }, { name: 'Nyange' }] },
              { name: 'Kavumu', children: [{ name: 'Kavumu' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Kavumu' }] }
            ]
          },
          {
            name: 'Matyazo',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Matyazo' }, { name: 'Nyange' }] },
              { name: 'Matyazo', children: [{ name: 'Matyazo' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Matyazo' }] }
            ]
          },
          {
            name: 'Muhanda',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Muhanda' }, { name: 'Nyange' }] },
              { name: 'Muhanda', children: [{ name: 'Muhanda' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Muhanda' }] }
            ]
          },
          {
            name: 'Muhororo',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Muhororo' }, { name: 'Nyange' }] },
              { name: 'Muhororo', children: [{ name: 'Muhororo' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Muhororo' }] }
            ]
          },
          {
            name: 'Ndaro',
            children: [
              { name: 'Bwira', children: [{ name: 'Bwira' }, { name: 'Kabaya' }, { name: 'Ndaro' }] },
              { name: 'Ndaro', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Bwira' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Kabaya' }] }
            ]
          },
          {
            name: 'Ngororero',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Ngororero' }, { name: 'Nyange' }] },
              { name: 'Ngororero', children: [{ name: 'Ngororero' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Ngororero' }] }
            ]
          },
          {
            name: 'Nyange',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Ndaro' }, { name: 'Nyange' }] },
              { name: 'Ndaro', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Bwira' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Kabaya' }] }
            ]
          },
          {
            name: 'Ruhango',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Ruhango' }, { name: 'Nyange' }] },
              { name: 'Ruhango', children: [{ name: 'Ruhango' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Ruhango' }] }
            ]
          },
          {
            name: 'Sovu',
            children: [
              { name: 'Kabaya', children: [{ name: 'Kabaya' }, { name: 'Sovu' }, { name: 'Nyange' }] },
              { name: 'Sovu', children: [{ name: 'Sovu' }, { name: 'Nyange' }, { name: 'Ndaro' }] },
              { name: 'Nyange', children: [{ name: 'Ndaro' }, { name: 'Nyange' }, { name: 'Sovu' }] }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Northern Province',
    children: [
      {
        name: 'Musanze',
        children: [
          {
            name: 'Busogo',
            children: [
              { name: 'Busogo', children: [{ name: 'Busogo' }, { name: 'Cyuve' }, { name: 'Musanze' }] },
              { name: 'Cyuve', children: [{ name: 'Cyuve' }, { name: 'Gacaca' }, { name: 'Nyange' }] },
              { name: 'Musanze', children: [{ name: 'Cyuve' }, { name: 'Kimonyi' }, { name: 'Muhoza' }] }
            ]
          },
          {
            name: 'Cyuve',
            children: [
              { name: 'Cyuve', children: [{ name: 'Cyuve' }, { name: 'Gacaca' }, { name: 'Nyange' }] },
              { name: 'Gacaca', children: [{ name: 'Gacaca' }, { name: 'Nyange' }, { name: 'Rwaza' }] },
              { name: 'Nyange', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] }
            ]
          },
          {
            name: 'Gacaca',
            children: [
              { name: 'Cyuve', children: [{ name: 'Cyuve' }, { name: 'Gacaca' }, { name: 'Nyange' }] },
              { name: 'Gacaca', children: [{ name: 'Gacaca' }, { name: 'Nyange' }, { name: 'Rwaza' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Gacaca' }] }
            ]
          },
          {
            name: 'Gataraga',
            children: [
              { name: 'Gataraga', children: [{ name: 'Gataraga' }, { name: 'Kinigi' }, { name: 'Nyange' }] },
              { name: 'Kinigi', children: [{ name: 'Kinigi' }, { name: 'Nyange' }, { name: 'Rwaza' }] },
              { name: 'Nyange', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] }
            ]
          },
          {
            name: 'Kinigi',
            children: [
              { name: 'Gataraga', children: [{ name: 'Gataraga' }, { name: 'Kinigi' }, { name: 'Nyange' }] },
              { name: 'Kinigi', children: [{ name: 'Kinigi' }, { name: 'Nyange' }, { name: 'Rwaza' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Kinigi' }] }
            ]
          },
          {
            name: 'Muhoza',
            children: [
              { name: 'Karambi', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] },
              { name: 'Muhoza', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] },
              { name: 'Musanze', children: [{ name: 'Cyuve' }, { name: 'Kimonyi' }, { name: 'Muhoza' }] }
            ]
          },
          {
            name: 'Musanze',
            children: [
              { name: 'Cyuve', children: [{ name: 'Cyuve' }, { name: 'Gacaca' }, { name: 'Nyange' }] },
              { name: 'Kimonyi', children: [{ name: 'Kimonyi' }, { name: 'Muhoza' }, { name: 'Nyange' }] },
              { name: 'Musanze', children: [{ name: 'Cyuve' }, { name: 'Kimonyi' }, { name: 'Muhoza' }] }
            ]
          },
          {
            name: 'Nyange',
            children: [
              { name: 'Karambi', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] },
              { name: 'Nyange', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Gacaca' }] }
            ]
          },
          {
            name: 'Remera',
            children: [
              { name: 'Kinigi', children: [{ name: 'Kinigi' }, { name: 'Remera' }, { name: 'Rwaza' }] },
              { name: 'Remera', children: [{ name: 'Remera' }, { name: 'Rwaza' }, { name: 'Nyange' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Rwaza',
            children: [
              { name: 'Gacaca', children: [{ name: 'Gacaca' }, { name: 'Nyange' }, { name: 'Rwaza' }] },
              { name: 'Nyange', children: [{ name: 'Karambi' }, { name: 'Musanze' }, { name: 'Nyange' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Gacaca' }] }
            ]
          },
          {
            name: 'Shingiro',
            children: [
              { name: 'Kinigi', children: [{ name: 'Kinigi' }, { name: 'Shingiro' }, { name: 'Rwaza' }] },
              { name: 'Shingiro', children: [{ name: 'Shingiro' }, { name: 'Rwaza' }, { name: 'Nyange' }] },
              { name: 'Rwaza', children: [{ name: 'Nyange' }, { name: 'Rwaza' }, { name: 'Shingiro' }] }
            ]
          }
        ]
      },
      {
        name: 'Gicumbi',
        children: [
          {
            name: 'Bukure',
            children: [
              { name: 'Bukure', children: [{ name: 'Bukure' }, { name: 'Cyumba' }, { name: 'Rushaki' }] },
              { name: 'Cyumba', children: [{ name: 'Cyumba' }, { name: 'Rushaki' }, { name: 'Rwamiko' }] },
              { name: 'Rushaki', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Bukure' }] }
            ]
          },
          {
            name: 'Byumba',
            children: [
              { name: 'Byumba', children: [{ name: 'Byumba' }, { name: 'Manyagiro' }, { name: 'Rwerere' }] },
              { name: 'Manyagiro', children: [{ name: 'Manyagiro' }, { name: 'Rwerere' }, { name: 'Rwamiko' }] },
              { name: 'Rwerere', children: [{ name: 'Rwerere' }, { name: 'Rwamiko' }, { name: 'Byumba' }] }
            ]
          },
          {
            name: 'Cyumba',
            children: [
              { name: 'Bukure', children: [{ name: 'Bukure' }, { name: 'Cyumba' }, { name: 'Rushaki' }] },
              { name: 'Cyumba', children: [{ name: 'Cyumba' }, { name: 'Rushaki' }, { name: 'Rwamiko' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Cyumba' }] }
            ]
          },
          {
            name: 'Gicumbi',
            children: [
              { name: 'Bukure', children: [{ name: 'Bukure' }, { name: 'Gicumbi' }, { name: 'Rushaki' }] },
              { name: 'Gicumbi', children: [{ name: 'Gicumbi' }, { name: 'Rushaki' }, { name: 'Rwamiko' }] },
              { name: 'Rushaki', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Gicumbi' }] }
            ]
          },
          {
            name: 'Kaniga',
            children: [
              { name: 'Bukure', children: [{ name: 'Bukure' }, { name: 'Kaniga' }, { name: 'Rushaki' }] },
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Rushaki' }, { name: 'Rwamiko' }] },
              { name: 'Rushaki', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Kaniga' }] }
            ]
          },
          {
            name: 'Manyagiro',
            children: [
              { name: 'Byumba', children: [{ name: 'Byumba' }, { name: 'Manyagiro' }, { name: 'Rwerere' }] },
              { name: 'Manyagiro', children: [{ name: 'Manyagiro' }, { name: 'Rwerere' }, { name: 'Rwamiko' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Manyagiro' }] }
            ]
          },
          {
            name: 'Miyove',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Miyove' }, { name: 'Rwamiko' }] },
              { name: 'Miyove', children: [{ name: 'Miyove' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Miyove' }] }
            ]
          },
          {
            name: 'Mutete',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Mutete' }, { name: 'Rwamiko' }] },
              { name: 'Mutete', children: [{ name: 'Mutete' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Mutete' }] }
            ]
          },
          {
            name: 'Nyamiyaga',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Nyamiyaga' }, { name: 'Rwamiko' }] },
              { name: 'Nyamiyaga', children: [{ name: 'Nyamiyaga' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Nyamiyaga' }] }
            ]
          },
          {
            name: 'Nyankenke',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Nyankenke' }, { name: 'Rwamiko' }] },
              { name: 'Nyankenke', children: [{ name: 'Nyankenke' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Nyankenke' }] }
            ]
          },
          {
            name: 'Rubaya',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Rubaya' }, { name: 'Rwamiko' }] },
              { name: 'Rubaya', children: [{ name: 'Rubaya' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Rubaya' }] }
            ]
          },
          {
            name: 'Rukomo',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Rukomo' }, { name: 'Rwamiko' }] },
              { name: 'Rukomo', children: [{ name: 'Rukomo' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Rukomo' }] }
            ]
          },
          {
            name: 'Rushaki',
            children: [
              { name: 'Bukure', children: [{ name: 'Bukure' }, { name: 'Cyumba' }, { name: 'Rushaki' }] },
              { name: 'Rushaki', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Bukure' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Cyumba' }] }
            ]
          },
          {
            name: 'Rutare',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Rutare' }, { name: 'Rwamiko' }] },
              { name: 'Rutare', children: [{ name: 'Rutare' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Rutare' }] }
            ]
          },
          {
            name: 'Rwamiko',
            children: [
              { name: 'Cyumba', children: [{ name: 'Cyumba' }, { name: 'Rushaki' }, { name: 'Rwamiko' }] },
              { name: 'Rushaki', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Bukure' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Cyumba' }] }
            ]
          },
          {
            name: 'Rwerere',
            children: [
              { name: 'Byumba', children: [{ name: 'Byumba' }, { name: 'Manyagiro' }, { name: 'Rwerere' }] },
              { name: 'Rwerere', children: [{ name: 'Rwerere' }, { name: 'Rwamiko' }, { name: 'Byumba' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Rwerere' }] }
            ]
          },
          {
            name: 'Shangasha',
            children: [
              { name: 'Kaniga', children: [{ name: 'Kaniga' }, { name: 'Shangasha' }, { name: 'Rwamiko' }] },
              { name: 'Shangasha', children: [{ name: 'Shangasha' }, { name: 'Rwamiko' }, { name: 'Rushaki' }] },
              { name: 'Rwamiko', children: [{ name: 'Rushaki' }, { name: 'Rwamiko' }, { name: 'Shangasha' }] }
            ]
          }
        ]
      },
      {
        name: 'Rulindo',
        children: [
          {
            name: 'Base',
            children: [
              { name: 'Base', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] },
              { name: 'Burega', children: [{ name: 'Burega' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] }
            ]
          },
          {
            name: 'Burega',
            children: [
              { name: 'Base', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] },
              { name: 'Burega', children: [{ name: 'Burega' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Rulindo', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] }
            ]
          },
          {
            name: 'Bushoki',
            children: [
              { name: 'Bushoki', children: [{ name: 'Bushoki' }, { name: 'Kinihira' }, { name: 'Ntarabana' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Bushoki' }] }
            ]
          },
          {
            name: 'Cyinzuzi',
            children: [
              { name: 'Base', children: [{ name: 'Base' }, { name: 'Cyinzuzi' }, { name: 'Kinihira' }] },
              { name: 'Cyinzuzi', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] }
            ]
          },
          {
            name: 'Kinihira',
            children: [
              { name: 'Base', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] },
              { name: 'Cyinzuzi', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] }
            ]
          },
          {
            name: 'Kisaro',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Kisaro' }] },
              { name: 'Kisaro', children: [{ name: 'Kisaro' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Kisaro' }] }
            ]
          },
          {
            name: 'Mbogo',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Mbogo' }] },
              { name: 'Mbogo', children: [{ name: 'Mbogo' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Mbogo' }] }
            ]
          },
          {
            name: 'Murambi',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Murambi' }] },
              { name: 'Murambi', children: [{ name: 'Murambi' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Murambi' }] }
            ]
          },
          {
            name: 'Ntarabana',
            children: [
              { name: 'Bushoki', children: [{ name: 'Bushoki' }, { name: 'Kinihira' }, { name: 'Ntarabana' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Bushoki' }] }
            ]
          },
          {
            name: 'Rukozo',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rukozo' }] },
              { name: 'Rukozo', children: [{ name: 'Rukozo' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Rukozo' }] }
            ]
          },
          {
            name: 'Rulindo',
            children: [
              { name: 'Base', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] },
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rulindo' }] },
              { name: 'Rulindo', children: [{ name: 'Base' }, { name: 'Burega' }, { name: 'Kinihira' }] }
            ]
          },
          {
            name: 'Rusiga',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Rusiga' }] },
              { name: 'Rusiga', children: [{ name: 'Rusiga' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Rusiga' }] }
            ]
          },
          {
            name: 'Shyorongi',
            children: [
              { name: 'Kinihira', children: [{ name: 'Cyinzuzi' }, { name: 'Kinihira' }, { name: 'Shyorongi' }] },
              { name: 'Shyorongi', children: [{ name: 'Shyorongi' }, { name: 'Ntarabana' }, { name: 'Rulindo' }] },
              { name: 'Ntarabana', children: [{ name: 'Kinihira' }, { name: 'Ntarabana' }, { name: 'Shyorongi' }] }
            ]
          }
        ]
      },
      {
        name: 'Gakenke',
        children: [
          {
            name: 'Busengo',
            children: [
              { name: 'Busengo', children: [{ name: 'Busengo' }, { name: 'Gakenke' }, { name: 'Janja' }] },
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Janja', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Busengo' }] }
            ]
          },
          {
            name: 'Coko',
            children: [
              { name: 'Coko', children: [{ name: 'Coko' }, { name: 'Gakenke' }, { name: 'Janja' }] },
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Janja', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Coko' }] }
            ]
          },
          {
            name: 'Cyabingo',
            children: [
              { name: 'Cyabingo', children: [{ name: 'Cyabingo' }, { name: 'Gakenke' }, { name: 'Janja' }] },
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Janja', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Cyabingo' }] }
            ]
          },
          {
            name: 'Gakenke',
            children: [
              { name: 'Busengo', children: [{ name: 'Busengo' }, { name: 'Gakenke' }, { name: 'Janja' }] },
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Gakenke' }] }
            ]
          },
          {
            name: 'Gashenyi',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Gashenyi' }, { name: 'Kamubuga' }] },
              { name: 'Gashenyi', children: [{ name: 'Gashenyi' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Gashenyi' }] }
            ]
          },
          {
            name: 'Janja',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Janja', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Busengo' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Gakenke' }] }
            ]
          },
          {
            name: 'Kamubuga',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Janja' }, { name: 'Kamubuga' }] },
              { name: 'Janja', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Busengo' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Gakenke' }] }
            ]
          },
          {
            name: 'Karambo',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Karambo' }, { name: 'Kamubuga' }] },
              { name: 'Karambo', children: [{ name: 'Karambo' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Karambo' }] }
            ]
          },
          {
            name: 'Kivuruga',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Kivuruga' }, { name: 'Kamubuga' }] },
              { name: 'Kivuruga', children: [{ name: 'Kivuruga' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Kivuruga' }] }
            ]
          },
          {
            name: 'Mataba',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Mataba' }, { name: 'Kamubuga' }] },
              { name: 'Mataba', children: [{ name: 'Mataba' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Mataba' }] }
            ]
          },
          {
            name: 'Minazi',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Minazi' }, { name: 'Kamubuga' }] },
              { name: 'Minazi', children: [{ name: 'Minazi' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Minazi' }] }
            ]
          },
          {
            name: 'Muhondo',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Muhondo' }, { name: 'Kamubuga' }] },
              { name: 'Muhondo', children: [{ name: 'Muhondo' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Muhondo' }] }
            ]
          },
          {
            name: 'Mugunga',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Mugunga' }, { name: 'Kamubuga' }] },
              { name: 'Mugunga', children: [{ name: 'Mugunga' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Mugunga' }] }
            ]
          },
          {
            name: 'Muyongwe',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Muyongwe' }, { name: 'Kamubuga' }] },
              { name: 'Muyongwe', children: [{ name: 'Muyongwe' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Muyongwe' }] }
            ]
          },
          {
            name: 'Nemba',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Nemba' }, { name: 'Kamubuga' }] },
              { name: 'Nemba', children: [{ name: 'Nemba' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Nemba' }] }
            ]
          },
          {
            name: 'Ruli',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Ruli' }, { name: 'Kamubuga' }] },
              { name: 'Ruli', children: [{ name: 'Ruli' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Ruli' }] }
            ]
          },
          {
            name: 'Rusasa',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Rusasa' }, { name: 'Kamubuga' }] },
              { name: 'Rusasa', children: [{ name: 'Rusasa' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Rusasa' }] }
            ]
          },
          {
            name: 'Rushashi',
            children: [
              { name: 'Gakenke', children: [{ name: 'Gakenke' }, { name: 'Rushashi' }, { name: 'Kamubuga' }] },
              { name: 'Rushashi', children: [{ name: 'Rushashi' }, { name: 'Kamubuga' }, { name: 'Janja' }] },
              { name: 'Kamubuga', children: [{ name: 'Janja' }, { name: 'Kamubuga' }, { name: 'Rushashi' }] }
            ]
          }
        ]
      },
      {
        name: 'Burera',
        children: [
          {
            name: 'Bungwe',
            children: [
              { name: 'Bungwe', children: [{ name: 'Bungwe' }, { name: 'Butaro' }, { name: 'Cyeru' }] },
              { name: 'Butaro', children: [{ name: 'Butaro' }, { name: 'Cyeru' }, { name: 'Kidaho' }] },
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Bungwe' }] }
            ]
          },
          {
            name: 'Butaro',
            children: [
              { name: 'Bungwe', children: [{ name: 'Bungwe' }, { name: 'Butaro' }, { name: 'Cyeru' }] },
              { name: 'Butaro', children: [{ name: 'Butaro' }, { name: 'Cyeru' }, { name: 'Kidaho' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Butaro' }] }
            ]
          },
          {
            name: 'Cyanika',
            children: [
              { name: 'Cyanika', children: [{ name: 'Cyanika' }, { name: 'Cyeru' }, { name: 'Kidaho' }] },
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Bungwe' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Cyanika' }] }
            ]
          },
          {
            name: 'Cyeru',
            children: [
              { name: 'Butaro', children: [{ name: 'Butaro' }, { name: 'Cyeru' }, { name: 'Kidaho' }] },
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Bungwe' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Butaro' }] }
            ]
          },
          {
            name: 'Gatebe',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Gatebe' }, { name: 'Kidaho' }] },
              { name: 'Gatebe', children: [{ name: 'Gatebe' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Gatebe' }] }
            ]
          },
          {
            name: 'Gitovu',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Gitovu' }, { name: 'Kidaho' }] },
              { name: 'Gitovu', children: [{ name: 'Gitovu' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Gitovu' }] }
            ]
          },
          {
            name: 'Kagogo',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kagogo' }, { name: 'Kidaho' }] },
              { name: 'Kagogo', children: [{ name: 'Kagogo' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Kagogo' }] }
            ]
          },
          {
            name: 'Kinoni',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kinoni' }, { name: 'Kidaho' }] },
              { name: 'Kinoni', children: [{ name: 'Kinoni' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Kinoni' }] }
            ]
          },
          {
            name: 'Kinyababa',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kinyababa' }, { name: 'Kidaho' }] },
              { name: 'Kinyababa', children: [{ name: 'Kinyababa' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Kinyababa' }] }
            ]
          },
          {
            name: 'Kivuye',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Kivuye' }, { name: 'Kidaho' }] },
              { name: 'Kivuye', children: [{ name: 'Kivuye' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Kivuye' }] }
            ]
          },
          {
            name: 'Nemba',
            children: [
              { name: 'Gatebe', children: [{ name: 'Gatebe' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Nemba', children: [{ name: 'Kidaho' }, { name: 'Nemba' }, { name: 'Gatebe' }] }
            ]
          },
          {
            name: 'Rugarama',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Rugarama' }, { name: 'Kidaho' }] },
              { name: 'Rugarama', children: [{ name: 'Rugarama' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Rugarama' }] }
            ]
          },
          {
            name: 'Rugengabari',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Rugengabari' }, { name: 'Kidaho' }] },
              { name: 'Rugengabari', children: [{ name: 'Rugengabari' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Rugengabari' }] }
            ]
          },
          {
            name: 'Ruhunde',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Ruhunde' }, { name: 'Kidaho' }] },
              { name: 'Ruhunde', children: [{ name: 'Ruhunde' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Ruhunde' }] }
            ]
          },
          {
            name: 'Rusarabuye',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Rusarabuye' }, { name: 'Kidaho' }] },
              { name: 'Rusarabuye', children: [{ name: 'Rusarabuye' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Rusarabuye' }] }
            ]
          },
          {
            name: 'Rweru',
            children: [
              { name: 'Cyeru', children: [{ name: 'Cyeru' }, { name: 'Rweru' }, { name: 'Kidaho' }] },
              { name: 'Rweru', children: [{ name: 'Rweru' }, { name: 'Kidaho' }, { name: 'Nemba' }] },
              { name: 'Kidaho', children: [{ name: 'Cyeru' }, { name: 'Kidaho' }, { name: 'Rweru' }] }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Eastern Province',
    children: [
      {
        name: 'Rwamagana',
        children: [
          {
            name: 'Fumbwe',
            children: [
              { name: 'Fumbwe', children: [{ name: 'Fumbwe' }, { name: 'Gahengeri' }, { name: 'Kigabiro' }] },
              { name: 'Gahengeri', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Nyakariro' }] },
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Gahengeri',
            children: [
              { name: 'Fumbwe', children: [{ name: 'Fumbwe' }, { name: 'Gahengeri' }, { name: 'Kigabiro' }] },
              { name: 'Gahengeri', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Nyakariro' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Gishari',
            children: [
              { name: 'Gishari', children: [{ name: 'Gishari' }, { name: 'Kigabiro' }, { name: 'Muhazi' }] },
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Muhazi', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Kigabiro',
            children: [
              { name: 'Gahengeri', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Nyakariro' }] },
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Muhazi', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Kigali',
            children: [
              { name: 'Kigali', children: [{ name: 'Kigali' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Muhazi', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Muhazi',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Muhazi', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Munyaga',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Munyaga' }, { name: 'Nyakariro' }] },
              { name: 'Munyaga', children: [{ name: 'Munyaga' }, { name: 'Nyakariro' }, { name: 'Muhazi' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Musha',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Musha' }, { name: 'Nyakariro' }] },
              { name: 'Musha', children: [{ name: 'Musha' }, { name: 'Nyakariro' }, { name: 'Muhazi' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Muyumbu',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muyumbu' }, { name: 'Nyakariro' }] },
              { name: 'Muyumbu', children: [{ name: 'Muyumbu' }, { name: 'Nyakariro' }, { name: 'Muhazi' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Nyakariro',
            children: [
              { name: 'Gahengeri', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Nyakariro' }] },
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Nyamirama',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Nyamirama' }, { name: 'Nyakariro' }] },
              { name: 'Nyamirama', children: [{ name: 'Nyamirama' }, { name: 'Nyakariro' }, { name: 'Muhazi' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Rubona',
            children: [
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Rubona' }, { name: 'Nyakariro' }] },
              { name: 'Rubona', children: [{ name: 'Rubona' }, { name: 'Nyakariro' }, { name: 'Muhazi' }] },
              { name: 'Nyakariro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] }
            ]
          },
          {
            name: 'Rwamagana',
            children: [
              { name: 'Gahengeri', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Rwamagana' }] },
              { name: 'Kigabiro', children: [{ name: 'Kigabiro' }, { name: 'Muhazi' }, { name: 'Nyakariro' }] },
              { name: 'Rwamagana', children: [{ name: 'Gahengeri' }, { name: 'Kigabiro' }, { name: 'Nyakariro' }] }
            ]
          }
        ]
      },
      {
        name: 'Kayonza',
        children: [
          {
            name: 'Gahini',
            children: [
              { name: 'Gahini', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Kayonza', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Kabare',
            children: [
              { name: 'Gahini', children: [{ name: 'Gahini' }, { name: 'Kabare' }, { name: 'Rwinkwavu' }] },
              { name: 'Kabare', children: [{ name: 'Kabare' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Kayonza',
            children: [
              { name: 'Gahini', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Kayonza', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Mukarange',
            children: [
              { name: 'Kayonza', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Mukarange' }] },
              { name: 'Mukarange', children: [{ name: 'Mukarange' }, { name: 'Rwinkwavu' }, { name: 'Ndego' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Murundi',
            children: [
              { name: 'Kayonza', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Murundi' }] },
              { name: 'Murundi', children: [{ name: 'Murundi' }, { name: 'Rwinkwavu' }, { name: 'Ndego' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Ndego',
            children: [
              { name: 'Mukarange', children: [{ name: 'Mukarange' }, { name: 'Rwinkwavu' }, { name: 'Ndego' }] },
              { name: 'Ndego', children: [{ name: 'Ndego' }, { name: 'Rwinkwavu' }, { name: 'Mwiri' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Nyamirama',
            children: [
              { name: 'Mwiri', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] },
              { name: 'Nyamirama', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Rukara',
            children: [
              { name: 'Kayonza', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rukara' }] },
              { name: 'Rukara', children: [{ name: 'Rukara' }, { name: 'Rwinkwavu' }, { name: 'Ndego' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          },
          {
            name: 'Rwinkwavu',
            children: [
              { name: 'Gahini', children: [{ name: 'Gahini' }, { name: 'Kayonza' }, { name: 'Rwinkwavu' }] },
              { name: 'Mwiri', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] },
              { name: 'Rwinkwavu', children: [{ name: 'Mwiri' }, { name: 'Nyamirama' }, { name: 'Rwinkwavu' }] }
            ]
          }
        ]
      },
      {
        name: 'Gatsibo',
        children: [
          {
            name: 'Gatsibo',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Rwimbogo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] }
            ]
          },
          {
            name: 'Gasange',
            children: [
              { name: 'Gasange', children: [{ name: 'Gasange' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Rwimbogo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] }
            ]
          },
          {
            name: 'Gitoki',
            children: [
              { name: 'Gasange', children: [{ name: 'Gasange' }, { name: 'Gitoki' }, { name: 'Rwimbogo' }] },
              { name: 'Gitoki', children: [{ name: 'Gitoki' }, { name: 'Kageyo' }, { name: 'Muhura' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Kabarore',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Kabarore' }, { name: 'Rwimbogo' }] },
              { name: 'Kabarore', children: [{ name: 'Kabarore' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Kageyo',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Kiramuruzi',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Kiramuruzi' }, { name: 'Rwimbogo' }] },
              { name: 'Kiramuruzi', children: [{ name: 'Kiramuruzi' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Muhura',
            children: [
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Remera', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Murambi',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Murambi' }, { name: 'Rwimbogo' }] },
              { name: 'Murambi', children: [{ name: 'Murambi' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Nyagihanga',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Nyagihanga' }, { name: 'Rwimbogo' }] },
              { name: 'Nyagihanga', children: [{ name: 'Nyagihanga' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Remera',
            children: [
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Remera', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Rugarama',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Rugarama' }, { name: 'Rwimbogo' }] },
              { name: 'Rugarama', children: [{ name: 'Rugarama' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Muhura', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] }
            ]
          },
          {
            name: 'Rwimbogo',
            children: [
              { name: 'Gatsibo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] },
              { name: 'Kageyo', children: [{ name: 'Kageyo' }, { name: 'Muhura' }, { name: 'Remera' }] },
              { name: 'Rwimbogo', children: [{ name: 'Gatsibo' }, { name: 'Kageyo' }, { name: 'Rwimbogo' }] }
            ]
          }
        ]
      },
      {
        name: 'Nyagatare',
        children: [
          {
            name: 'Gatunda',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Kiyombe' }, { name: 'Nyagatare' }] },
              { name: 'Kiyombe', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Karangazi',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Karangazi' }, { name: 'Nyagatare' }] },
              { name: 'Karangazi', children: [{ name: 'Karangazi' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Katabagemu',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Katabagemu' }, { name: 'Nyagatare' }] },
              { name: 'Katabagemu', children: [{ name: 'Katabagemu' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Kiyombe',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Kiyombe' }, { name: 'Nyagatare' }] },
              { name: 'Kiyombe', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Rwimiyaga', children: [{ name: 'Nyagatare' }, { name: 'Rwimiyaga' }, { name: 'Kiyombe' }] }
            ]
          },
          {
            name: 'Matimba',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Matimba' }, { name: 'Nyagatare' }] },
              { name: 'Matimba', children: [{ name: 'Matimba' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Mimuli',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Mimuli' }, { name: 'Nyagatare' }] },
              { name: 'Mimuli', children: [{ name: 'Mimuli' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Mukama',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Mukama' }, { name: 'Nyagatare' }] },
              { name: 'Mukama', children: [{ name: 'Mukama' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Musheli',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Musheli' }, { name: 'Nyagatare' }] },
              { name: 'Musheli', children: [{ name: 'Musheli' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Nyagatare',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Kiyombe' }, { name: 'Nyagatare' }] },
              { name: 'Kiyombe', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Rukomo',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Rukomo' }, { name: 'Nyagatare' }] },
              { name: 'Rukomo', children: [{ name: 'Rukomo' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Rwempasha',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Rwempasha' }, { name: 'Nyagatare' }] },
              { name: 'Rwempasha', children: [{ name: 'Rwempasha' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          },
          {
            name: 'Rwimiyaga',
            children: [
              { name: 'Kiyombe', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Rwimiyaga', children: [{ name: 'Nyagatare' }, { name: 'Rwimiyaga' }, { name: 'Kiyombe' }] }
            ]
          },
          {
            name: 'Tabagwe',
            children: [
              { name: 'Gatunda', children: [{ name: 'Gatunda' }, { name: 'Tabagwe' }, { name: 'Nyagatare' }] },
              { name: 'Tabagwe', children: [{ name: 'Tabagwe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] },
              { name: 'Nyagatare', children: [{ name: 'Kiyombe' }, { name: 'Nyagatare' }, { name: 'Rwimiyaga' }] }
            ]
          }
        ]
      },
      {
        name: 'Kirehe',
        children: [
          {
            name: 'Gatore',
            children: [
              { name: 'Gatore', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Gahara',
            children: [
              { name: 'Gahara', children: [{ name: 'Gahara' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Kigarama',
            children: [
              { name: 'Gatore', children: [{ name: 'Gatore' }, { name: 'Kigarama' }, { name: 'Mahama' }] },
              { name: 'Kigarama', children: [{ name: 'Kigarama' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Kigina',
            children: [
              { name: 'Gatore', children: [{ name: 'Gatore' }, { name: 'Kigina' }, { name: 'Mahama' }] },
              { name: 'Kigina', children: [{ name: 'Kigina' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Kirehe',
            children: [
              { name: 'Gatore', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Mahama',
            children: [
              { name: 'Gatore', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mahama' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Mpanga',
            children: [
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mpanga' }] },
              { name: 'Mpanga', children: [{ name: 'Mpanga' }, { name: 'Mahama' }, { name: 'Musaza' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Mushikiri',
            children: [
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Mushikiri' }] },
              { name: 'Mushikiri', children: [{ name: 'Mushikiri' }, { name: 'Mahama' }, { name: 'Musaza' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Musaza',
            children: [
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] },
              { name: 'Musaza', children: [{ name: 'Mahama' }, { name: 'Musaza' }, { name: 'Nyarubuye' }] },
              { name: 'Nyarubuye', children: [{ name: 'Musaza' }, { name: 'Nyarubuye' }, { name: 'Mahama' }] }
            ]
          },
          {
            name: 'Nasho',
            children: [
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Nasho' }] },
              { name: 'Nasho', children: [{ name: 'Nasho' }, { name: 'Mahama' }, { name: 'Musaza' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Nyamugali',
            children: [
              { name: 'Kirehe', children: [{ name: 'Gatore' }, { name: 'Kirehe' }, { name: 'Nyamugali' }] },
              { name: 'Nyamugali', children: [{ name: 'Nyamugali' }, { name: 'Mahama' }, { name: 'Musaza' }] },
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Musaza' }] }
            ]
          },
          {
            name: 'Nyarubuye',
            children: [
              { name: 'Mahama', children: [{ name: 'Kirehe' }, { name: 'Mahama' }, { name: 'Nyarubuye' }] },
              { name: 'Nyarubuye', children: [{ name: 'Musaza' }, { name: 'Nyarubuye' }, { name: 'Mahama' }] },
              { name: 'Musaza', children: [{ name: 'Mahama' }, { name: 'Musaza' }, { name: 'Nyarubuye' }] }
            ]
          }
        ]
      },
      {
        name: 'Ngoma',
        children: [
          {
            name: 'Gashanda',
            children: [
              { name: 'Gashanda', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Jarama',
            children: [
              { name: 'Gashanda', children: [{ name: 'Gashanda' }, { name: 'Jarama' }, { name: 'Mugesera' }] },
              { name: 'Jarama', children: [{ name: 'Jarama' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Karembo',
            children: [
              { name: 'Gashanda', children: [{ name: 'Gashanda' }, { name: 'Karembo' }, { name: 'Mugesera' }] },
              { name: 'Karembo', children: [{ name: 'Karembo' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Kibungo',
            children: [
              { name: 'Gashanda', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Mugesera',
            children: [
              { name: 'Gashanda', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mugesera' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Mutenderi',
            children: [
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Mutenderi' }] },
              { name: 'Mutenderi', children: [{ name: 'Mutenderi' }, { name: 'Mugesera' }, { name: 'Sake' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Remera',
            children: [
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Remera' }] },
              { name: 'Remera', children: [{ name: 'Remera' }, { name: 'Mugesera' }, { name: 'Sake' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Rukira',
            children: [
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Rukira' }] },
              { name: 'Rukira', children: [{ name: 'Rukira' }, { name: 'Mugesera' }, { name: 'Sake' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Rurenge',
            children: [
              { name: 'Kibungo', children: [{ name: 'Gashanda' }, { name: 'Kibungo' }, { name: 'Rurenge' }] },
              { name: 'Rurenge', children: [{ name: 'Rurenge' }, { name: 'Mugesera' }, { name: 'Sake' }] },
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] }
            ]
          },
          {
            name: 'Sake',
            children: [
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Sake' }] },
              { name: 'Sake', children: [{ name: 'Mugesera' }, { name: 'Sake' }, { name: 'Zaza' }] },
              { name: 'Zaza', children: [{ name: 'Sake' }, { name: 'Zaza' }, { name: 'Mugesera' }] }
            ]
          },
          {
            name: 'Zaza',
            children: [
              { name: 'Mugesera', children: [{ name: 'Kibungo' }, { name: 'Mugesera' }, { name: 'Zaza' }] },
              { name: 'Zaza', children: [{ name: 'Sake' }, { name: 'Zaza' }, { name: 'Mugesera' }] },
              { name: 'Sake', children: [{ name: 'Mugesera' }, { name: 'Sake' }, { name: 'Zaza' }] }
            ]
          }
        ]
      },
      {
        name: 'Bugesera',
        children: [
          {
            name: 'Gashora',
            children: [
              { name: 'Gashora', children: [{ name: 'Gashora' }, { name: 'Juru' }, { name: 'Nyamata' }] },
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Nyamata', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] }
            ]
          },
          {
            name: 'Juru',
            children: [
              { name: 'Gashora', children: [{ name: 'Gashora' }, { name: 'Juru' }, { name: 'Nyamata' }] },
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Juru' }] }
            ]
          },
          {
            name: 'Kamabuye',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Kamabuye' }, { name: 'Rilima' }] },
              { name: 'Kamabuye', children: [{ name: 'Kamabuye' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Kamabuye' }] }
            ]
          },
          {
            name: 'Mareba',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Mareba' }, { name: 'Rilima' }] },
              { name: 'Mareba', children: [{ name: 'Mareba' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Mareba' }] }
            ]
          },
          {
            name: 'Mayange',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Mayange' }, { name: 'Rilima' }] },
              { name: 'Mayange', children: [{ name: 'Mayange' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Mayange' }] }
            ]
          },
          {
            name: 'Musenyi',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Musenyi' }, { name: 'Rilima' }] },
              { name: 'Musenyi', children: [{ name: 'Musenyi' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Musenyi' }] }
            ]
          },
          {
            name: 'Ngeruka',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Ngeruka' }, { name: 'Rilima' }] },
              { name: 'Ngeruka', children: [{ name: 'Ngeruka' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Ngeruka' }] }
            ]
          },
          {
            name: 'Ntarama',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Ntarama' }, { name: 'Rilima' }] },
              { name: 'Ntarama', children: [{ name: 'Ntarama' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Ntarama' }] }
            ]
          },
          {
            name: 'Nyamata',
            children: [
              { name: 'Gashora', children: [{ name: 'Gashora' }, { name: 'Juru' }, { name: 'Nyamata' }] },
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Nyamata', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] }
            ]
          },
          {
            name: 'Nyarugenge',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Nyarugenge' }, { name: 'Rilima' }] },
              { name: 'Nyarugenge', children: [{ name: 'Nyarugenge' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Nyarugenge' }] }
            ]
          },
          {
            name: 'Rilima',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Nyamata', children: [{ name: 'Juru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Juru' }] }
            ]
          },
          {
            name: 'Ruhuha',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Ruhuha' }, { name: 'Rilima' }] },
              { name: 'Ruhuha', children: [{ name: 'Ruhuha' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Ruhuha' }] }
            ]
          },
          {
            name: 'Rweru',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Rweru' }, { name: 'Rilima' }] },
              { name: 'Rweru', children: [{ name: 'Rweru' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Rweru' }] }
            ]
          },
          {
            name: 'Shyara',
            children: [
              { name: 'Juru', children: [{ name: 'Juru' }, { name: 'Shyara' }, { name: 'Rilima' }] },
              { name: 'Shyara', children: [{ name: 'Shyara' }, { name: 'Nyamata' }, { name: 'Rilima' }] },
              { name: 'Rilima', children: [{ name: 'Nyamata' }, { name: 'Rilima' }, { name: 'Shyara' }] }
            ]
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getDistricts = (provinceName: string): string[] => {
  const province = rwandaLocations.find(p => p.name === provinceName);
  return province?.children?.map(d => d.name) || [];
};

export const getSectors = (provinceName: string, districtName: string): string[] => {
  const province = rwandaLocations.find(p => p.name === provinceName);
  const district = province?.children?.find(d => d.name === districtName);
  return district?.children?.map(s => s.name) || [];
};

export const getCells = (provinceName: string, districtName: string, sectorName: string): string[] => {
  const province = rwandaLocations.find(p => p.name === provinceName);
  const district = province?.children?.find(d => d.name === districtName);
  const sector = district?.children?.find(s => s.name === sectorName);
  return sector?.children?.map(c => c.name) || [];
};

export const getVillages = (provinceName: string, districtName: string, sectorName: string, cellName: string): string[] => {
  const province = rwandaLocations.find(p => p.name === provinceName);
  const district = province?.children?.find(d => d.name === districtName);
  const sector = district?.children?.find(s => s.name === sectorName);
  const cell = sector?.children?.find(c => c.name === cellName);
  return cell?.children?.map(v => v.name) || [];
};

// Function to generate school ID from school name
export const generateSchoolId = (schoolName: string): string => {
  if (!schoolName) return '';
  
  // Remove common words and get meaningful parts
  const commonWords = ['school', 'academy', 'college', 'university', 'institute', 'center', 'centre'];
  const words = schoolName
    .toLowerCase()
    .split(' ')
    .filter(word => !commonWords.includes(word) && word.length > 2);
  
  // Take first 3 meaningful words or letters if less words available
  let prefix = '';
  if (words.length >= 2) {
    prefix = words.slice(0, 2).map(word => word.substring(0, 3).toUpperCase()).join('');
  } else if (words.length === 1) {
    prefix = words[0].substring(0, 6).toUpperCase();
  } else {
    // Fallback: use first letters of each word
    prefix = schoolName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 6);
  }
  
  // Add random numbers for uniqueness
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `${prefix}${randomNum.toString().padStart(3, '0')}`;
};
