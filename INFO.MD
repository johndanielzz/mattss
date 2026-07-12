Google Maps Place Results API
The Google Maps Place Results API allows a user to scrape the results of a Google Maps Place. SerpApi is able to make sense of this information and extract a place_results object.

This object can contain title, reviews, rating, price, type, events, address, booking_link, phone, description, open_state, hours, check_in_time, check_out_time, extensions ("highlights", "accessibility", "crowd", "payments", etc.), images ("title", "thumbnail"), user_reviews ("summary", "most_relevant", etc.), thumbnail, gps_coordinates, data_id, data_cid (also known as CID or ludocid), links, people_also_search_for, similar_places_nearby, hotels, vacation_rentals, neighborhoods and more.


The API endpoint is https://serpapi.com/search?engine=google_maps

Head to the playground for a live and interactive demo.

To scrape Google Maps Place results with SerpApi, create a search with these parameters:

API Parameters
type

Required

Parameter must be set to place. (I.e., type=place)

Parameter is not required when using place_id.

data

Required

Parameter must be set in the next format: !4m5!3m4!1s + data_id + !8m2!3d + latitude + !4d + longitude

Parameter is not required when using place_id.

place_id

Optional

Parameter defines the unique reference to a place on a Google Map. Place IDs are available for most locations, including businesses, landmarks, parks, and intersections. You can find the place_id using our Google Maps API.

You can read more about Place IDs here.

place_id can be used without any other optional parameter.

gl

Optional

Parameter defines the country to use for the Google Maps search. It's a two-letter country code. (e.g., us for the United States, uk for United Kingdom, or fr for France). Head to the Google countries page for a full list of supported Google countries.

Parameter only affects Place Results API.

API Examples
Place results overview
These kind of results represent Google Maps place results. They cover specific locations and places (e.g. stores, offices, hotels, monuments, cities, provinces, countries, etc.).

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Stumptown Coffee Roasters",
    "place_id": "ChIJT2h1HKZZwokR0kgzEtsa03k",
    "data_id": "0x89c259a61c75684f:0x79d31adb123348d2",
    "data_cid": "8778389626880739538",
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259a61c75684f%3A0x79d31adb123348d2&engine=google_maps_reviews&hl=en",
    "photos_link": "https://serpapi.com/search.json?data_id=0x89c259a61c75684f%3A0x79d31adb123348d2&engine=google_maps_photos&hl=en",
    "gps_coordinates": {
      "latitude": 40.7457399,
      "longitude": -73.9882272
    },
    "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272&engine=google_maps&google_domain=google.com&hl=en&type=place",
    "provider_id": "/g/1hhw712x0",
    "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNtnPBJ2Oi_C2YNamHTXyqU9I8mRBarCIvM5g5v=w129-h86-k-no",
    "serpapi_thumbnail": "https://serpapi.com/images/url/zzeDQHicuxmXUVJSUGylr5-TYaqXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFngV5IX4ORl5J8Z72wU6ZeY6xESUVkYaulpkRvklFjk7Fnma5puWmZbbmhkqZthYaabrZuXDwCjYyEZ",
    "rating": 4.5,
    "reviews": 1388,
    "price": "$$",
    "type": [
      "Coffee shop",
      "Cafe",
      "Coffee store",
      "Tea store"
    ],
    "type_ids": [
      "coffee_shop",
      "cafe",
      "coffee_store",
      "tea_store"
    ],
    "description": "Coffee bar chain offering house-roasted direct-trade coffee, along with brewing gear & whole beans",
    "menu": {
      "link": "http://places.singleplatform.com/stumptown/menu?ref=google",
      "source": "places.singleplatform.com"
    },
    "order_online_link": "https://food.google.com/chooseprovider?restaurantId=/g/1hhw712x0&g2lbs=AL1YbfXV3ifVlyOlkMh7ewBcAt914i9WDkvURcwf5YlOzyFa_R9Jb2K5zKhdkPzNSOuEWmKweSn2qWtlQ0D2tDEMrkza6JVW06Kx2HCR8AyC9TOmnr89N4U%3D&hl=en-US&gl=us&fo_m=MfohQo559jFvMWvkddHzV46uMT_RFPQ05bfKMQVr5-7IofUJMU_hT8vrWuwRMUv3d8yCO4PgMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=3C40Y7C_F6OJ0PEPmYiSwAQ&ei=3C40Y7C_F6OJ0PEPmYiSwAQ&fo_s=OA,AH,SOE",
    "service_options": {
      "dine_in": true,
      "takeout": true,
      "delivery": false
    },
    "extensions": [
      {
        "highlights": [
          "Fast service",
          "Great coffee",
          "Great tea selection"
        ]
      },
      {
        "popular_for": [
          "Breakfast",
          "Solo dining",
          "Good for working on laptop"
        ]
      },
      {
        "accessibility": [
          "Wheelchair accessible entrance",
          "Wheelchair accessible restroom",
          "Wheelchair accessible seating"
        ]
      },
      ...
    ],
    "unsupported_extensions": [
      {
        "accessibility": [
          "Wheelchair accessible parking lot"
        ]
      },
      {
        "planning": [
          "Accepts reservations"
        ]
      }
    ],
    "address": "18 W 29th St, New York, NY 10001",
    "located_in": "Ace hotel New York",
    "website": "https://www.stumptowntogo.com/",
    "phone": "(855) 711-3385",
    "open_state": "Open ⋅ Closes 5PM",
    "plus_code": "P2W6+7P New York",
    "hours": [
      {
        "wednesday": "6:30AM–5PM"
      },
      {
        "thursday": "6:30AM–5PM"
      },
      {
        "friday": "6:30AM–5PM"
      },
      ...
    ],
    "images": [
      {
        "title": "All",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNtnPBJ2Oi_C2YNamHTXyqU9I8mRBarCIvM5g5v=w447-h298-k-no"
      },
      {
        "title": "Latest",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNJMj0YyZ-_ebLvyojnTwTHMG_-7lyjVE1gXVV8=w224-h298-k-no"
      },
      {
        "title": "Menu",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipPBMJ-jooeY_UYrvbV10Fvjs7tswXTKuny-Mx5i=w224-h298-k-no"
      },
      ...
    ],
    "user_reviews": {
      "summary": [
        {
          "snippet": "\"The baristas here are pretty cool people who pull excellent espresso shots.\""
        },
        {
          "snippet": "\"Long lines every morning, but the staff moves everyone through pretty quickly.\""
        },
        {
          "snippet": "\"Prices were a little pricey for size on the iced coffees.\""
        }
      ],
      "most_relevant": [
        {
          "username": "Peter Farejowicz",
          "rating": 5,
          "contributor_id": "103688512592452127720",
          "description": "Another great Stumptown location, I’m a big fan of their coffee anywhere. This particular spot is conveniently located near Madison Square Park off Broadway. The shop has some space inside to sit along the window but is mostly a grab and go location.\n\nThe line wasn’t too bad and I got my drip coffee quickly. The prices here to me are very reasonable and the sizes great.\n\nStumptown coffee blends are always a hit and getting it straight from the source tastes extra delicious in the mornings!",
          "images": [
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipMvfI5qn5wgCAsb8qLHZzIOaCgDJNHECrsC4mzs=w150-h150-k-no-p"
            },
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipO9qil4-umhwP8tXcvx9nw8U8VD2XX7xs6lhV0n=w150-h150-k-no-p"
            },
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNibYeSBKZ5EmpiR672P8VTXy88soG1b333Olkg=w150-h150-k-no-p"
            }
          ],
          "date": "a month ago"
        },
        ...
      ]
    },
    "people_also_search_for": [
      {
        "search_term": "Coffee shops",
        "local_results": [
          {
            "position": 1,
            "title": "Culture Espresso",
            "data_id": "0x0:0x88ca3d6ff537d876",
            "data_cid": "9856758285518493814",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0x88ca3d6ff537d876&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0x88ca3d6ff537d876&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.7520746,
              "longitude": -73.9857387
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0x88ca3d6ff537d876%218m2%213d40.7520746%214d-73.9857387&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.5,
            "reviews": 1183,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOfqz4XRKZLCTff5ZIAT5CnwAMivcRhzvw6TYqA=w156-h156-k-no-pi0-ya240-ro0-fo100",
            "type": [
              "Espresso bar",
              "Bakery",
              "Cookies"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Coffee roasters",
        "local_results": [
          {
            "position": 1,
            "title": "Irving Farm New York",
            "data_id": "0x0:0xb7d1c448bc0e0f46",
            "data_cid": "13245583795745066822",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0xb7d1c448bc0e0f46&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0xb7d1c448bc0e0f46&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.736810299999995,
              "longitude": -73.9869409
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0xb7d1c448bc0e0f46%218m2%213d40.736810299999995%214d-73.9869409&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.2,
            "reviews": 552,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipN8U4YuUu1pS9PxWeJ-C6BcuKz-fo7pGX1qJ3Gk=w156-h156-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Other locations for Stumptown",
        "local_results": [
          {
            "position": 1,
            "title": "Stumptown Coffee Roasters",
            "data_id": "0x0:0x3034ad801dc5fcb3",
            "data_cid": "3473591978376428723",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0x3034ad801dc5fcb3&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0x3034ad801dc5fcb3&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.7328275,
              "longitude": -73.9979664
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0x3034ad801dc5fcb3%218m2%213d40.7328275%214d-73.9979664&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.5,
            "reviews": 1137,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOAlU-xDa_lDuFCdsuJ66-6NQpETZi1YWSqbXdx=w156-h156-n-k-no",
            "type": [
              "Coffee shop",
              "Cafe",
              "Coffee store",
              "Tea store"
            ]
          }
        ]
      }
    ],
  }
  ...
}
Example of extensions
These results are available under expanded description and can contain various extensions information, including highlights, crowd, accessibility, payments, etc.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "extensions": [
      {
        "highlights": [
          "Fast service",
          "Fireplace",
          "Great coffee",
          "Great tea selection",
          "Live performances"
        ]
      },
      {
        "popular_for": [
          "Solo dining"
        ]
      },
      {
        "accessibility": [
          "Wheelchair accessible restroom"
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of popular_times
Some places include "Popular times" section with the per-hour/day details about busyness state.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJNc-tXDMbdkgRK71JU82ZU38

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJNc-tXDMbdkgRK71JU82ZU38",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "popular_times": {
      "current_day": "thursday",
      "live_hash": {
        "info": "Less busy than usual",
        "time_spent": "People typically spend 45 min to 1.5 hr here"
      },
      "graph_results": {
        "sunday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "busyness_score": 0
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 50
          },
          ...
        ],
        "monday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 20
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 47
          },
          ...
        ],
        "tuesday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 33
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 63
          },
          ...
        ],
        "wednesday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 26
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 42
          },
          ...
        ],
        "thursday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 34
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 65,
            "live_busyness_score": 15,
            "current": true
          },
          ...
        ],
        "friday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 25
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 33
          },
          ...
        ],
        "saturday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "busyness_score": 0
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 55
          },
          ...
        ]
      }
    },
    ...
  },
  ...
}
Example of hours and hours_last_updated
Besides the "Hours" section, some places may also include information about when the hours were last updated.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJSWN4ldUEdkgRGqo3OSnf1CY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJSWN4ldUEdkgRGqo3OSnf1CY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "hours": [
      {
        "thursday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "friday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "saturday": "9 AM–10:30 PM"
      },
      {
        "sunday": "11:30 AM–9 PM"
      },
      {
        "monday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "tuesday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "wednesday": "7:30–10:30 AM, 12–10:30 PM"
      }
    ],
    "hours_last_updated": "Confirmed by this business 4 weeks ago",
    ...
  },
  ...
}
Example of location_summary
Some places include "Location summary" section with the details about neighborhood, popular places and transit options.

GET


https://serpapi.com/search.json?engine=google_maps&type=search&q=Soho+House+Chicago

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "search",
  q: "Soho House Chicago",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "location_summary": {
      "neighborhood": {
        "title": "Fulton Market District",
        "data_id": "0x880e2cd089e3e49d:0x634c70bc48c1aeb3",
        "data_cid": "7155217861961690803",
        "place_id": "ChIJneTjidAsDogRs67BSLxwTGM"
      },
      "description": "Hip area with modern dining on West Fulton Market St., lively cocktail bars & music venues.",
      "ratings": {
        "total": {
          "value": 4.271208995537456,
          "verdict": "Great for visitors"
        },
        "proximity_to_things_to_do": {
          "value": 4.615718867223665,
          "verdict": "Excellent"
        },
        "proximity_to_transit": {
          "value": 4.6433318718140795,
          "verdict": "Excellent"
        },
        "airport_access": {
          "value": 4.149301485215413,
          "verdict": "Great"
        }
      },
      "things_to_do": [
        {
          "title": "The Art Institute of Chicago",
          "data_id": "0x880e2ca3e2d94695:0x4829f3cc9ca2d0de",
          "data_cid": "5199955304902742238",
          "place_id": "ChIJlUbZ4qMsDogR3tCinMzzKUg",
          "description": "Renowned art museum holding nearly 300,000 works from all over the world, spanning many centuries.",
          "rating": 4.8,
          "reviews": 35520,
          "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvTWvn4iNr2ESmVIXRdEFpvVGvQS5lW_EpHfC3u4wCpUtk1BBb",
          "gps_coordinates": {
            "latitude": 41.8796031,
            "longitude": -87.6223504
          }
        },
        ...
      ],
      "transit": [
        {
          "title": "Ogilvie Transportation Center",
          "data_id": "0x880e2cc71c0b855f:0xb098c28fb3a60491",
          "data_cid": "12725134669585450129",
          "place_id": "ChIJX4ULHMcsDogRkQSms4_CmLA",
          "gps_coordinates": {
            "latitude": 41.8831389,
            "longitude": -87.6404919
          },
          "travel_options": [
            {
              "mode": "Walking",
              "time": "10 min"
            }
          ]
        },
        ...
      ],
      "airports": [
        {
          "title": "Chicago O'Hare International Airport",
          "data_id": "0x880fb4276a7762f3:0x511747070259ad4b",
          "data_cid": "5843217136966282571",
          "place_id": "ChIJ82J3aie0D4gRS61ZAgdHF1E",
          "gps_coordinates": {
            "latitude": 41.9794444,
            "longitude": -87.9075
          },
          "travel_options": [
            {
              "mode": "Driving",
              "time": "28 min"
            },
            {
              "mode": "Transit",
              "time": "54 min"
            }
          ]
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of posts ("From the owner")
For each Local Posts ("From the owner") result, we are able to extract its media (image or video), cta (Call To Action, e.g. "Order online", "View Offer", "Book"), link (for "Book" and "Order online" cta), phone (for "Call now" cta), post_link, description, duration (e.g. "Jan 14 - Feb 5"), and date.

To scrape all posts use serpapi_posts_link, which points to our full Google Maps Posts API engine.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJl0kwjOJYwokRjO41zufkr_w

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJl0kwjOJYwokRjO41zufkr_w",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "serpapi_posts_link": "https://serpapi.com/search.json?data_id=0x89c258e28c304997%3A0xfcafe4e7ce35ee8c&engine=google_maps_posts",
    "posts": [
      {
        "title": "In need of catering? 🍕",
        "media": "https://lh3.googleusercontent.com/geougc/AF1QipMgVEIERuF51zyOgEW7O21TtvgVWoyyt88SnIkB=h400-no",
        "cta": "Order online",
        "link": "https://slicelife.com/restaurants/ny/new-york/10017/la-vera-pizzeria-restaurant/menu?utm_source=gmb_event&utm_campaign=gmb_event_9704_v498_14_01_2025",
        "post_link": "https://search.google.com/local/posts?q=La+Vera+Pizzeria+%26+Restaurant&ludocid=18208023502730423948&lpsid=CIHM0ogKEICAgIC_8palYQ&source=sh/x/localposts&lsig=AB86z5Usfb0cPwzraSkUHAR4qsX8",
        "description": "We’ve got you covered! Our catering options are perfect for any event, big or small. Let us help make your occasion memorable. 🍾",
        "duration": "Jan 14 - Feb 5",
        "date": "Jan 14, 2025"
      },
      ...
    ],
    ...
  },
  ...
}
Example of user_reviews
These results can contain various user review information, including rating, number of reviews, user_reviews with a summary, topics, and most_relevant reviews. To scrape all reviews use reviews_link, which points to our full Google Maps Reviews API engine.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT994RulZwokRdgqQX0zc3QY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT994RulZwokRdgqQX0zc3QY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259e94678df4f%3A0x6dddc4c5f900a76&engine=google_maps_reviews&hl=en",
    "rating_summary": [
      {
        "stars": 1,
        "amount": 29
      },
      {
        "stars": 2,
        "amount": 32
      },
      {
        "stars": 3,
        "amount": 63
      },
      {
        "stars": 4,
        "amount": 155
      },
      {
        "stars": 5,
        "amount": 1178
      }
    ],
    "rating": 4.7,
    "reviews": 1457,
    "user_reviews": {
      "summary": [
        {
          "snippet": "\"The croissant had a crispy cookie-like crust and buttery interior layers.\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjW3LrrVwi-mDW5WQKHXOamURBu-eEORn8gD4ZzWQ3IMFrFb_ts=s40-k-cc-rp-mo"
        },
        {
          "snippet": "\"Nice space, outdoor seating, excellent small selection of food treats...\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjX9W035tROPs9DeeHmntbtSmuDq4IGFQ8bPYfV6AsVqkQfs7My6LQ=s40-k-cc-rp-mo"
        },
        {
          "snippet": "\"Very good cardamom bun, good hot chocolate, nice service, pretty atmosphere\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjXVXV9eQhocOs39bkOyxZYUU1DtF7OVTaS_FF7c6QaHi1aeh-pP=s40-k-cc-rp-mo"
        }
      ],
      "topics": [
        {
          "keyword": "cardamom bun",
          "mentions": 243,
          "id": "/g/11lrwk1gqj"
        },
        {
          "keyword": "canele",
          "mentions": 41,
          "id": "/m/08gks_"
        },
        {
          "keyword": "almond croissant",
          "mentions": 32,
          "id": "/g/11ny2yf91k"
        },
        ...
      ],
      "most_relevant": [
        {
          "username": "Inger Margrete Hansen",
          "rating": 4,
          "contributor_id": "112345261084793229724",
          "user_review_count": 808,
          "user_photo_count": 2793,
          "user_thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjWHjcM3Ac6Cp_TmyPCibNdwNZz1dM3WOAmiAVA8I0h1h77i_oO5=s120-c-rp-mo-ba6-br100",
          "description": "As someone from Denmark, La Cabra has always been a familiar refuge — a place where coffee is treated with the same quiet rigour and curiosity that shaped its beginnings in Aarhus. Their approach is built on intention: one roast profile, chosen at the cupping table, meant to reveal the coffee’s character rather than manipulate it.\n\nI wasn’t expecting a queue for something that feels so intrinsically like home, but that’s New York asserting itself. The space was lovely, the coffee tasted exactly as it should — clean, bright, and grounded in the philosophy they’ve carried from Aarhus to Copenhagen to here — yet the rush of the café stole a bit of the calm I usually associate with La Cabra. More of the city’s energy than the café’s fault, but still noticeable.\n\nStill, it was a comfort to sit there, coffee in hand, knowing the same careful decisions underpin every cup on both sides of the Atlantic.",
          "link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21JMlpFUnlWa3hLTURkdWVFUklkblpLV0d4R1pGRRAB!2m1!1s0x0:0x6dddc4c5f900a76!3m1!1s2@1:CAIQACodChtycF9oOmI2ZERyVkxKMDdueERIdnZKWGxGZFE%7C0dCfNrN99Wx%7C?hl=en-US",
          "images": [
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38uexxxvXfuZKQvXxlu727wdQIlLyEBVJC5YH2n0lGLonK8FVaAtxJFECzn9CcynYa6EXaL1q692W7Zx_9AczOxk2PzDJf5fO2Wi1V738wFTGC159bPilqJCzlolGv4iQjNhNYNiP98mlRBZ"
            },
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38sjr7a8rB9RzZkQQcYRSL8DM_J99tOS_S-5AENSxcr6ZGjVbhWc0JIAwN-Nww9BKve_mX43bdPyi_XLsNG-m4Z-wK9F6OosoypjvL8N407cybue13r4BbtKiArwAgEED90w4QvlkyhbsHuh"
            },
            ...
          ],
          "date": "a month ago",
          "date_iso8601": "2025-12-08T11:27:51+00:00"
        },
        {
          "username": "Wade Hannah Aaron",
          "rating": 5,
          "contributor_id": "107763711468134518584",
          "user_review_count": 122,
          "user_photo_count": 330,
          "user_thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjUKEsNIb3pBNTDa9BZB0hK-sQGi_5Kz5yDBwtfa-8krB2uLv7brXw=s120-c-rp-mo-ba4-br100",
          "description": "The place is bumping. Lively atmosphere with the music. Baristas were on top of their game. Had a really good pour over. It was on point. The pastry I had was great too. If you have some extra money to spare get one of the pour overs. It’s on the next page of the menu. I tried a sample of their drip, don’t think I would drink their drip. I would go for the pour over menu or espresso.",
          "link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2taSVRGVm1iWHByWmtGalNGSlZNR1JwYjNCWlFWRRAB!2m1!1s0x0:0x6dddc4c5f900a76!3m1!1s2@1:CAIQACodChtycF9oOkZITFVmbXprZkFjSFJVMGRpb3BZQVE%7C0d4rLJQAh5x%7C?hl=en-US",
          "images": [
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38vANNA_K8WHFEDqeIoT6FAjtrQda4cxBY5nBob7cNao8pQ3alBK05l7SxCpDtVsmS-ODvjp0P6I9tko3Ytf1pk2epGNembcPFquQT0WdVlRXMogFHybzRwRx6P7Un7dMPB9WEqgG-EXIBc"
            },
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38tw07bHrKIn5SXs1ZjhYoply5STAxpNG9bSw7KpbXaLnJnahDG_dz7x8ECZzsz19EbDOY2OGvBK82E7AfmaKrnw0P1P2gYB8YZdSSQjoohggCks75-uHIAL8o0Nv3ZG-NWcadC0ZRDKhmWG"
            },
            ...
          ],
          "date": "2 months ago",
          "date_iso8601": "2025-11-14T18:31:48+00:00"
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of user_reviews.source
Some places include reviews posted on the other platforms.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT994RulZwokRdgqQX0zc3QY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT994RulZwokRdgqQX0zc3QY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "user_reviews": {
      "source": [
        {
          "name": "Tripadvisor",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/icon_100532569.png",
          "source_review_count": 2116,
          "reviews": [
            {
              "rating": 4.2,
              "rating_scale": 5,
              "username": "travelqueenNi",
              "description": "A great stay in the most affordable accommodation I could find for a solo trip to NYC, an easy 2-minute walk from 103rd Street #1 subway station. |I stayed in a 6-bed female dorm and appreciated the privacy curtains on the beds, the individual charging port, and large locker for my things- make sure to bring your own lock.  Sheets, a towel and blanket are also provided.|The hostel was very clean, and most of my fellow travellers were considerate when coming in late at night, although there's always a few that don't know how to be quiet or close a door gently, and you can hear people thumping across the floors above- so bring earplugs if you are a light sleeper. |The bathroom was generally very clean, although they need more than 3 sinks in each, to enable easier handwashing, especially in the morning/ late at night.|It was always nice to get in after a day in the cold- but a cap on the heating would be good- a girl in my room the first 2 nights kept putting it up to 77- it was boiling! |I really appreciated the reasonable prices in the cafe- it was a great place to get breakfast or grab a late night sandwich- I recommend the chipotle chicken panini! |All in all I would happily return for a city break, given the price of hotels in Manhattan.",
              "date": "4 weeks ago",
              "date_iso8601": "2025-12-17T05:00:00+00:00"
            }
          ]
        },
        {
          "name": "Priceline",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/icon_220.png",
          "source_review_count": 67,
          "reviews": [
            {
              "rating": 8.1,
              "rating_scale": 10,
              "username": "William",
              "description": "Positive: The price a d many of the amenities the hotel offers. Negative: The only real complaint I'd say O have is that the staff shuts down bathrooms for cleaning before checkout time when people are trying to get ready to be out by 11:00.  They should do this cleaning early morning or after check out time.",
              "pros": [
                {
                  "description": "The price a d many of the amenities the hotel offers."
                }
              ],
              "cons": [
                {
                  "description": "The only real complaint I'd say O have is that the staff shuts down bathrooms for cleaning before checkout time when people are trying to get ready to be out by 11:00.  They should do this cleaning early morning or after check out time."
                }
              ],
              "date": "2 weeks ago",
              "date_iso8601": "2025-12-28T05:00:00+00:00"
            }
          ]
        },
        {
          "name": "Trip.com",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/b8089cb0-34b4-458c-8749-9bc4614baba4.png",
          "source_review_count": 285,
          "reviews": [
            {
              "rating": 4.3,
              "rating_scale": 5,
              "username": "Trip.com Member",
              "description": "This place is a good place to stay good location and friendly staff will be back",
              "date": "2 months ago",
              "date_iso8601": "2025-11-11T05:00:00+00:00"
            }
          ]
        }
      ]
    },
    ...
  },
  ...
}
Example of people_also_search_for
These results contain local_results for various search terms that people also search for.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "people_also_search_for": [
      {
        "search_term": "Coffee shops",
        "local_results": [
          {
            "title": "Culture Espresso",
            "data_id": "0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "data_cid": 9856758285518493814,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "gps_coordinates": {
              "latitude": 40.752093599999995,
              "longitude": -73.9857349
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259aa4c38ca75%3A0x88ca3d6ff537d876%218m2%213d40.752093599999995%214d-73.9857349&engine=google_maps&token=290cc7f402607b40&type=place",
            "rating": 4.5,
            "reviews": 873,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOX1xZlGdy6qv0DGAuWY0GUlW0PZQHKqo51Tzfm=w152-h152-n-k-no",
            "type": [
              "Coffee shop",
              "Bakery",
              "Cookies"
            ]
          },
          {
            "title": "Birch Coffee @Flatiron",
            "data_id": "0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "data_cid": 15514259972409934763,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "gps_coordinates": {
              "latitude": 40.743643399999996,
              "longitude": -73.9864284
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a65b82f7f7%3A0xd74db93f308e43ab%218m2%213d40.743643399999996%214d-73.9864284&engine=google_maps&token=bac233f6ecb0eed9&type=place",
            "rating": 4.4,
            "reviews": 868,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipPeI5KTq8N9oMXldbvDzCInlWE7oj-8E46hDirL=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Coffee roasters",
        "local_results": [
          {
            "title": "Irving Farm New York",
            "data_id": "0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "data_cid": 13245583795745066822,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "gps_coordinates": {
              "latitude": 40.736810299999995,
              "longitude": -73.9869409
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a1c4280bdf%3A0xb7d1c448bc0e0f46%218m2%213d40.736810299999995%214d-73.9869409&engine=google_maps&token=6d251792bf23c62a&type=place",
            "rating": 4.2,
            "reviews": 476,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipN8U4YuUu1pS9PxWeJ-C6BcuKz-fo7pGX1qJ3Gk=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          {
            "title": "City of Saints Coffee Roasters",
            "data_id": "0x89c2599be2211b3d:0xbd935870741bd5ee",
            "data_cid": 13660359334752409070,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c2599be2211b3d:0xbd935870741bd5ee",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c2599be2211b3d:0xbd935870741bd5ee",
            "gps_coordinates": {
              "latitude": 40.7312224,
              "longitude": -73.9899877
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c2599be2211b3d%3A0xbd935870741bd5ee%218m2%213d40.7312224%214d-73.9899877&engine=google_maps&token=63b206fd43182b3d&type=place",
            "rating": 4.6,
            "reviews": 255,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipP5wmDk51ur6RuyEI3Uu5HrNJrkRLzkiBTiSTIq=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Other locations for Stumptown",
        "local_results": [
          {
            "title": "Stumptown Coffee Roasters",
            "data_id": "0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "data_cid": 3473591978376428723,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "gps_coordinates": {
              "latitude": 40.7327498,
              "longitude": -73.9980013
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c25996d46ccfed%3A0x3034ad801dc5fcb3%218m2%213d40.7327498%214d-73.9980013&engine=google_maps&token=c24c0eebe443daa0&type=place",
            "rating": 4.5,
            "reviews": 931,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipON31ttw5sh7fxIbXtnClymnSzCVgpECLlnXuaO=w152-h152-n-k-no",
            "type": [
              "Coffee shop",
              "Cafe",
              "Tea store",
              "Coffee store"
            ]
          }
        ]
      }
    ],
    ...
  },
  ...
}
Results for: Tryp by Wyndham New York City Times Square
These type of results are for hotels. SerpApi is able to extract, among other data, pricing, amenities, from a source (e.g. "TripAdvisor", "Hotels.com", "Expedia.com", "Booking.com", etc.) and similar_places_nearby (include price, distance, etc.).

   
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT1lEiK1ZwokRypK1zWcooRo

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT1lEiK1ZwokRypK1zWcooRo",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "TRYP by Wyndham New York City Times Square South",
    "place_id": "ChIJT1lEiK1ZwokRypK1zWcooRo",
    "data_id": "0x89c259ad8844594f:0x1aa12867cdb592ca",
    "data_cid": "1918859342534513354",
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad8844594f%3A0x1aa12867cdb592ca&engine=google_maps_reviews&hl=en",
    "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad8844594f%3A0x1aa12867cdb592ca&engine=google_maps_photos&hl=en",
    "gps_coordinates": {
      "latitude": 40.753779099999996,
      "longitude": -73.9946197
    },
    "place_id_search": "https://serpapi.com/search.json?engine=google_maps&google_domain=google.com&hl=en&place_id=ChIJT1lEiK1ZwokRypK1zWcooRo",
    "provider_id": "/g/1hm58br6y",
    "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMLsvCyWVuMSj-GSzDCCteIcuNTXE8LJfOAZkU8=w152-h86-k-no",
    "serpapi_thumbnail": "https://serpapi.com/images/url/Q6D9LHicuxmXUVJSUGylr5-TYayXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFng61Nc5lwZHlbqG5yl6x5c5eLsXJLqmVzqFxLhauHjlebvGJUdamFbbmhqpJthYaabrZuXDwCwLSFB",
    "rating": 3.5,
    "reviews": 2504,
    "pricing": {
      "for_date": {
        "start": "2026-01-04",
        "end": "2026-01-05"
      },
      "offers": [
        {
          "source": "Hotels.com",
          "price": "£139",
          "link": "https://www.google.com/aclk?sa=l&ai=DChsSEwj25fvp7v2PAxXJqFoFHfNrCPUYACICCAEQTBoCdnU&co=1&ase=2&gclid=EAIaIQobChMI9uX76e79jwMVyahaBR3zawj1EAoYASABEgLLBPD_BwE&category=acrcp_v1_48&sig=AOD64_1anAGVElXpPWkCWw44PhzMqVQnoA&nis=4&adurl"
        },
        {
          "source": "Expedia.co.uk",
          "price": "£139",
          "link": "https://www.google.com/aclk?sa=l&ai=DChsSEwj25fvp7v2PAxXJqFoFHfNrCPUYACICCAEQGBoCdnU&co=1&ase=2&gclid=EAIaIQobChMI9uX76e79jwMVyahaBR3zawj1EAoYAiABEgKs7PD_BwE&category=acrcp_v1_48&sig=AOD64_1Y_94Q6gnHWsjGadbZrJfwWRXirQ&nis=4&adurl"
        },
        ...
      ],
      "all_options": [
        {
          "source": "TRYP by Wyndham New York City Times Square South",
          "price": "£138",
          "link": "https://ad.doubleclick.net/ddm/clk/448223535;252310881;b;u=srch_HPA_WYNDHAM-80004_mapresults_1_GB_desktop_2026-01-04_default___organic%3Fhttps://linkcenterus.derbysoftca.com/dplatform-linkcenter/booking.htm?hotelCode=WYNDHAM-80004&providerHotelCode=WYNDHAM-80004&checkInDate=2026-01-04&checkOutDate=2026-01-05&identifier=wyndham-google&price=185.80&roomTypeCode=A1K&ratePlanCode=SPD6&currency=USD&userCurrency=GBP&language=en&userCountry=GB&testClick=false&sitetype=mapresults&deviceType=desktop&priceDisplayedTax=37.71&priceDisplayedTotal=138.33&partnerId=Wyndham_ds&campaignid=&userlistid=&ifDefaultDate=default&u=srch_HPA_WYNDHAM-80004_mapresults_1_GB_desktop_2026-01-04_default___organic&adults=2&children=0&clk_src=",
          "official_site": true
        },
        {
          "source": "trivago DEALS",
          "price": "£117",
          "link": "https://www.trivago.deals/hotels/united-states_ny_new-york/146463_tryp-by-wyndham-new-york-city-times-square-midtown?checkIn=2026-01-04&checkOut=2026-01-05&placeId=H146463&campaignName=TrivagoDeals_Google_UK&currencyCode=GBP&dealKey=CAIQxwYiDAjIuunGBhCA9rjdASpUDQAAvEIVAAD8QiUAADxBLWZmJkAwATi6AkUAALxCSgsIw7rpxgYQlI29R2IKVHJ5cCBLaW5nIGgCfQAAokGNAa5HvEKVAVK4PkCgAc7VvAioAcgGMI0GOJ_4CECI8A9IAVIIR9Dez-X_MyxYugY&countryCode=GB&languageCode=en&rule=Google_UK&site=mapresults&ads=&origin=31&priceDisplayedTotal=117.23&priceDisplayedTax=37.58&device=desktop&adults=2&children=0"
        },
        {
          "source": "Splitty",
          "price": "£124",
          "link": "https://www.splitty.com/hotels/united-states_ny_new-york/146463_tryp-by-wyndham-new-york-city-times-square-midtown?checkIn=2026-01-05&checkOut=2026-01-06&placeId=H146463&campaignName=GoSplitty_Google_US&currencyCode=USD&dealKey=CAIQ2AIiCwio-47IBhDAxKdnKlgNAADmQhUAAOZCJa5HZUEtAABgQDABOJcCRQAA5kJKDAit6I7IBhDcjNz3AWIKU3RhbmRhcmQgVGgCfY_C2UGCAQCNAVK45kKVAexRgECgAb3yhiKoAcgGMI0GOJ_4CECJ8A9IAVII5v5T6L3BUlNYyAY&countryCode=US&languageCode=en&rule=Google_US&site=mapresults&origin=31&ads=&priceDisplayedTotal=146.23&priceDisplayedTax=49.06&device=desktop&adults=2&children=0"
        },
        {
          "source": "Expedia.com",
          "price": "£150",
          "link": "https://www.expedia.com/Hotel-Search?selected=4621019&startDate=2026-01-05&endDate=2026-01-06&MDPCID=US.META.HPA.HOTEL-ORGANIC-desktop.HOTEL&MDPDTL=HTL.4621019.20260105.20260106.DDT.67.CID..AUDID..RRID.bex_us_desktop&mctc=10&ct=hotel&mpg=USD&mpf=176.06&mpj=49.41&mpl=USD&exp_pg=google&langid=en&ad=2&tp=&utm_source=google&utm_medium=cpc&utm_term=4621019&utm_content=mapresults&utm_campaign=HotelAds&langid=1033&adults=2&children=&rateplanid=382507249&mpm=24&mpn=201388499&mpo=EC&mpp=1"
        },
        {
          "source": "Prestigia.com",
          "price": "£161",
          "link": "https://www.prestigia.com/en/produit.php?idTarget=26977&arrivee=2026-01-05&depart=2026-01-06&pid=16&a=1000129&guestsParams=W3siYWR1bHRzIjoyLCJjaGlsZHJlbiI6MCwiYWdlcyI6W119XQ==&dev=3&pv=MTM3LjM3fDIzLjc2fDAuMDB8ZmFsc2U=&curr=USD&verif=false&ad_click=false&campaign_id=&src="
        },
        ...
      ]
    },
    "type": [
      "Hotel",
      "Inn"
    ],
    "type_ids": [
      "hotel",
      "inn"
    ],
    "description": "Bright rooms in a funky modern lodging offering an airy lobby bistro & a 24-hour fitness center. Set in lower Midtown, this funky modern hotel is 4 blocks from both Penn Station and Madison Square Garden. Bright modern rooms sleep up to 8 guests, and have reclaimed wood floors, free Wi-Fi, flat-screen TVs and iPod docks. Some rooms have game consoles, bunk beds, or fitness rooms with workout equipment. An airy lobby bistro serves breakfast, tapas and cocktails. There's a 24-hour fitness center, along with 5 meeting rooms, including a seasonal rooftop terrace.",
    "amenities": [
      "Free Wi-Fi",
      "Paid breakfast",
      "Paid parking",
      "Air-conditioned",
      "Business center",
      "Pet-friendly",
      "Smoke-free",
      ...
    ],
    "check_in_time": "3:00 PM",
    "check_out_time": "11:00 AM",
    "address": "345 W 35th St, New York, NY 10001, United States",
    "website": "https://www.wyndhamhotels.com/tryp/new-york-city-new-york/tryp-new-york-city-times-square-south-midtown/overview?CID=LC:v6v3hkulmqj2jri:45264&iata=00093796",
    "phone": "+1 212-600-2440",
    "plus_code": "Q234+G5 New York, USA",
    "similar_places_nearby": [
      {
        "position": 1,
        "title": "Hilton Garden Inn New York Times Square South",
        "data_id": "0x89c259ad738c44e1:0xeb832607d63168d1",
        "data_cid": "16970449635962349777",
        "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad738c44e1%3A0xeb832607d63168d1&engine=google_maps_reviews&hl=en",
        "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad738c44e1%3A0xeb832607d63168d1&engine=google_maps_photos&hl=en",
        "gps_coordinates": {
          "latitude": 40.754481999999996,
          "longitude": -73.99359799999999
        },
        "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259ad738c44e1%3A0xeb832607d63168d1%218m2%213d40.754481999999996%214d-73.99359799999999&engine=google_maps&google_domain=google.com&hl=en&type=place",
        "rating": 4.2,
        "reviews": 1846,
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipO2f82eSrGSJv8J9jRxojsi2Tv0QwNwPLzvCbDm=w134-h90-k-no",
        "description": "3-star hotel for £64 less",
        "distance": "0.1 mi away",
        "price": "£74"
      },
      {
        "position": 2,
        "title": "Fairfield by Marriott Inn & Suites New York Manhattan/Times Square South",
        "data_id": "0x89c259ad9cd4b195:0x5d03bf5f4a80e73",
        "data_cid": "418900692903136883",
        "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73&engine=google_maps_reviews&hl=en",
        "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73&engine=google_maps_photos&hl=en",
        "gps_coordinates": {
          "latitude": 40.754048999999995,
          "longitude": -73.994254
        },
        "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73%218m2%213d40.754048999999995%214d-73.994254&engine=google_maps&google_domain=google.com&hl=en&type=place",
        "rating": 4.2,
        "reviews": 1629,
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMHTppypzvuPK7rNZFUuXVNF10gmUJEbpLk-YEG=w135-h90-k-no",
        "description": "Also a 4-star hotel, for £20 less",
        "distance": "0.1 mi away",
        "price": "£118"
      },
      ...
    ],
    ...
  },
  ...
}
Example of events
You can get extended events results for concert halls, arenas, theaters etc.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJPS8b1vhYwokRldqq2YHmxJI

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJPS8b1vhYwokRldqq2YHmxJI",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "events": [
      {
        "title": "Joshua Bassett: The Golden Years",
        "date": {
          "start_date": "Tue, Aug 20",
          "start_time": "7:30 PM",
          "when": "Tue, Aug 20 · 7:30 PM"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRlX9dXJLB6I3VlbsBeLcLsnRaQlMQW44HbhcHk5yVg769Ad60h",
        "ticket_info": {
          "price": "$11",
          "extracted_price": 11,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjoshua-bassett-the-golden-years-new-york-new-york-08-20-2024%2Fevent%2F3C0060B98F9F0D92&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Naomi Sharon",
        "date": {
          "start_date": "Thu, Sep 5",
          "start_time": "7:00 PM",
          "when": "Thu, Sep 5 · 7:00 PM"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5mxMiajOufB9x74Wxau4PvmJrmVbxjwZ--tNr5eZfKykv8BXC",
        "ticket_info": {
          "price": "$264",
          "extracted_price": 264,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Ftems-born-in-the-wild-tour-new-york-new-york-09-05-2024%2Fevent%2F3C0060A7C4840ABA&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Jon Batiste",
        "date": {
          "start_date": "Fri, Sep 6",
          "start_time": "8:00 PM",
          "when": "Fri, Sep 6 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSDYl8dng-HZK5tM6F4U_czlkBKUmGduqjrXex17iZibCFBump",
        "ticket_info": {
          "price": "$52",
          "extracted_price": 52,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjon-batiste-at-radio-city-new-york-new-york-09-06-2024%2Fevent%2F3C006072EE8D0DC7&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Jon Batiste",
        "date": {
          "start_date": "Sat, Sep 7",
          "start_time": "8:00 PM",
          "when": "Sat, Sep 7 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSDYl8dng-HZK5tM6F4U_czlkBKUmGduqjrXex17iZibCFBump",
        "ticket_info": {
          "price": "$67",
          "extracted_price": 67,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjon-batiste-at-radio-city-new-york-new-york-09-07-2024%2Fevent%2F3C006072EE9A0DCA&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Rainbow Kitten Surprise: Love Hate Music Box Tour",
        "date": {
          "start_date": "Thu, Sep 12",
          "start_time": "8:00 PM",
          "when": "Thu, Sep 12 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcScgZ9OW9HJwEkIdix4TWDHQ31cSpHzh28c_Rs8GptktyK8giRp",
        "ticket_info": {
          "price": "$62",
          "extracted_price": 62,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Frainbow-kitten-surprise-love-hate-music-new-york-new-york-09-12-2024%2Fevent%2F3C0060BCE4000F06&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      ...
    ],
    ...
  },
  ...
}
Example of questions_and_answers
These results usually contain one highlighted question and answer pair.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x3e5f6cb0b2a778c9:0xeea9e351c55ed53a!8m2!3d25.06475!4d55.145912

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x3e5f6cb0b2a778c9:0xeea9e351c55ed53a!8m2!3d25.06475!4d55.145912",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "questions_and_answers": [
      {
        "question": {
          "user": {
            "name": "Ben Vaux",
            "link": "https://www.google.com/maps/contrib/111670536407267120973",
            "local_guide_level": 4,
            "thumbnail": "https://lh5.ggpht.com/-hp51y7rptk0/AAAAAAAAAAI/AAAAAAAAAAA/c5tUu0ALLp0/c0x00000000-cc-rp-mo-ba2/photo.jpg"
          },
          "text": "Why don’t you offer local water to drink?",
          "date": "5 years ago",
          "language": "en"
        },
        "answer": {
          "user": {
            "name": "Customer Care",
            "link": "https://www.google.com/maps/contrib/100905753574939093964",
            "local_guide_level": 0,
            "thumbnail": "https://lh6.ggpht.com/-paOHmoSNHXs/AAAAAAAAAAI/AAAAAAAAAAA/lzh8Yud3VO4/c0x00000000-cc-rp-mo/photo.jpg"
          },
          "text": "Hello Ben Vaux, Greetings from The Hamptons Cafe! Unfortunately currently we don't serve local water as per our menu, but we serve aqua panna waters.",
          "date": "3 months ago",
          "language": "en"
        },
        "total_answers": 2
      }
    ],
    ...
  },
  ...
}
Example of at_this_place
These results can appear if a building contains more than one business.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x8644b5a73c20f903%3A0xaa945f555da7262a!8m2!3d30.2689471!4d-97.7403971

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x8644b5a73c20f903%3A0xaa945f555da7262a!8m2!3d30.2689471!4d-97.7403971",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "at_this_place": {
      "type": [
        {
          "title": "Food & Drink",
          "places": 4
        },
        {
          "title": "Shopping",
          "places": 3
        },
        {
          "title": "Recreations",
          "places": 2
        },
        ...
      ],
      "places": [
        {
          "position": 1,
          "title": "Capital Factory",
          "data_id": "0x8644b5a741a48747:0x3c7ccf742ba7769d",
          "data_cid": "4358586637243348637",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x8644b5a741a48747%3A0x3c7ccf742ba7769d&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x8644b5a741a48747%3A0x3c7ccf742ba7769d&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.268888899999997,
            "longitude": -97.7405556
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x8644b5a741a48747%3A0x3c7ccf742ba7769d%218m2%213d30.268888899999997%214d-97.7405556&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 281,
          "reviews": 4.6,
          "type": "Coworking space",
          "type_id": "coworking_space",
          "address": "701 Brazos St, Austin, TX 78701",
          "location": "Floor 1",
          "open_state": "Closed ⋅ Opens 9AM",
          "hours": [
            {
              "friday": "9AM–5PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipMcSI2ZryIVPgkQ0Ha5V9-KisMe8DEs7HDaZ-ke=w86-h86-n-k-no"
        },
        {
          "position": 2,
          "title": "The Car Savior - Garage & Mobile Mechanic",
          "data_id": "0x8644cad7cc002d6b:0x70774b59bf5c8d5e",
          "data_cid": "8104028903311183198",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.2688755,
            "longitude": -97.7405641
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e%218m2%213d30.2688755%214d-97.7405641&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 78,
          "reviews": 4.8,
          "type": "Auto repair shop",
          "type_id": "auto_repair_shop",
          "address": "701 Brazos St #1600, Austin, TX 78701",
          "open_state": "Closed ⋅ Opens 8AM",
          "hours": [
            {
              "friday": "8AM–6PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNdX-DqnQAYl7f8ep6w2TT3vcJdHMZukpWXioDA=w86-h86-n-k-no"
        },
        {
          "position": 3,
          "title": "Let's Eat, Grandma",
          "data_id": "0x865b34be93908cdd:0x8974a80af9806eaf",
          "data_cid": "9904726245583646383",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x865b34be93908cdd%3A0x8974a80af9806eaf&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x865b34be93908cdd%3A0x8974a80af9806eaf&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.2688755,
            "longitude": -97.7405641
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x865b34be93908cdd%3A0x8974a80af9806eaf%218m2%213d30.2688755%214d-97.7405641&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 78,
          "reviews": 4.9,
          "type": "Resume service",
          "type_id": "resume_service",
          "address": "701 Brazos St STE 500, Austin, TX 78701",
          "location": "Floors 1 and 1",
          "open_state": "Closed ⋅ Opens 9AM",
          "hours": [
            {
              "friday": "9AM–5:30PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNKq4eRGcCWcSR0vdYot5XV8PASXpf4OSA9BDCf=w86-h86-n-k-no"
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of admission
These results usually appear for attractions and museums.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "admission": [
      {
        "title": "Eiffel Tower",
        "icon": "https://www.gstatic.com/ads-travel/ttd/official_admission_32x32.png",
        "options": [
          {
            "title": "Second floor - Stair access",
            "link": "https://www.toureiffel.paris/en/rates-offers/ticket-second-floor-stairs?utm_source=magpietravelgttd",
            "price": "$11.43",
            "extracted_price": 11.43,
            "official_site": true,
            "extensions": [
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      {
        "title": "Trip.com",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://us.trip.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options": [
          {
            "title": "Early Bird Ticket: 20:00-23:00 (Admission only valid within the timeslot assigne",
            "link": "https://us.trip.com/travel-guide/attraction/paris/eiffel-tower-78772/?aid=1076145&sid=4330723&s-productIdTop=48061166&source=bm&currency=USD",
            "price": "$17.41",
            "extracted_price": 17.41,
            "extensions": [
              "Mobile Ticket"
            ]
          },
          ...
        ]
      },
      {
        "title": "Viator",
        "icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.viator.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options": [
          {
            "title": "Entrance to 2nd floor via Foot",
            "link": "https://www.viator.com/en-US/tours/Paris/Eiffel-Tower-Paris-entry-ticket/d479-371158P2?googlettd=true&src=papi",
            "price": "$23.50",
            "extracted_price": 23.5,
            "extensions": [
              "Instant confirmation"
            ]
          },
          ...
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of experiences
These results usually appear for attractions and museums.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "experiences": [
      {
        "title": "Paris Eiffel Tower Guided Climb Tour by Stairs",
        "link": "https://us.trip.com/things-to-do/detail/16124226?language=EN&locale=en_us&allianceid=1076145&sid=4330723&source=bm&currency=USD",
        "price": "$38.63",
        "extracted_price": 38.63,
        "rating": 5,
        "reviews": 47,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe4jydWLqg0B5D2-5E2uhe3fddxRqNjyEA0szDjHfUooCmtQRR",
        "serpapi_thumbnail": "https://serpapi.com/images/url/1UgPPXicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw5JNcmqTAn3KUw3cDJ1MdI1dTUqzUg1TktJqQgq9MuqdHU0KK5yyfJIC83Pd84tCQwKAgAsKSXr",
        "source": "Trip.com",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://us.trip.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "2h"
      },
      {
        "title": "Eiffel Tower: Reserved Entrance & Guided Tour with Optional Summit",
        "link": "https://www.tiqets.com/en-US/paris-attractions-c66746/tickets-for-eiffel-tower-guided-tour-by-lift-with-summit-option-p997409/?tq_source=ttd_product_feed&utm_source=e",
        "price": "$43.69",
        "extracted_price": 43.69,
        "rating": 4.5,
        "reviews": 30,
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTAIxThM74Lj_pMtOcI7iWiPT64GQGWSJcc_F7AxZiFFQI0eLsp",
        "serpapi_thumbnail": "https://serpapi.com/images/url/ZJeBqXicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnqJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw5x9KwIyfA1N_HJii_wLfFP9jTPDM8MCDEzcQ90Dw_2Sk6OdzN3rIjKdHML9DRI9SkuAAAmLiVB",
        "source": "Tiqets",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.tiqets.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "1h"
      },
      {
        "title": "Eiffel Tower: Skip The Line to the 2nd Floor + Summit Access (If Selected)",
        "link": "https://www.tiqets.com/en-US/paris-attractions-c66746/tickets-for-eiffel-tower-skip-the-ticket-line-2nd-floor-and-summit-option-p997343/?tq_source=ttd_product_feed&utm_source=e",
        "price": "$54.88",
        "extracted_price": 54.88,
        "rating": 4.6,
        "reviews": 173,
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIPn6b_vx08MLfI8ATTNzWP3ArC6-QyLegtNLFDIff6LG5K4Lz",
        "serpapi_thumbnail": "https://serpapi.com/images/url/rwjr6Xicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnqJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70DMgzS4ovqzCw8PVJ87RwDAnxqwoPMHYscjbTDaz0SU0v8fNxc_FMSzPzcTf1NvGpAgAfhSTI",
        "source": "Tiqets",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.tiqets.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "1h 30m"
      },
      ...
    ],
    ...
  },
  ...
}
Results for: Austin
These type of results are for cities, provinces and countries. We are able to extract, among other data, weather, hotels, vacation_rentals, and neighborhoods.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Austin",
    ...
    "weather": {
      "conditions": "Clear",
      "conditions_thumbnail": "https://ssl.gstatic.com/onebox/weather/32/sunny.png",
      "celsius": "4°C",
      "fahrenheit": "39°F"
    },
    "hotels": [
      {
        "position": 1,
        "title": "InTown Suites Extended Stay Austin TX – Research Blvd",
        "data_id": "0x8644cd131b8d09c1:0x6e30e73185636dd",
        ...
        "rating": 3.1,
        "reviews": 545,
        "type": "2-star hotel",
        "price": "$50",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    "vacation_rentals": [
      {
        "position": 1,
        "title": "HGTV Featured Tiny Home w Hot Tub Near East 6th St",
        "data_id": "0x0:0xac0984808e4cd9b2",
        ...
        "property_type": "House",
        "capacity": "Sleeps 4",
        "price": "$101",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh5.googleusercontent.com/proxy/..."
      },
      ...
    ],
    "neighborhoods": [
      {
        "position": 1,
        "title": "Downtown Austin",
        "data_id": "0x8644b50a22f2576f:0xfded6e1aca5cba6",
        ...
        "description": "Texas State Capitol & bustling nightlife",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of hotels
When searching for a city or region, hotels can appear in the place results. Each hotel includes rating, reviews, type (star classification), price, check_in_date, gps_coordinates, and links to reviews and photos.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "hotels": [
      {
        "position": 1,
        "title": "InTown Suites Extended Stay Austin TX – Research Blvd",
        "data_id": "0x8644cd131b8d09c1:0x6e30e73185636dd",
        "data_cid": "495683985933943517",
        "place_id": "ChIJwQmNGxPNRIYR3TZWGHMO4wY",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644cd131b8d09c1:0x6e30e73185636dd",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644cd131b8d09c1:0x6e30e73185636dd",
        "gps_coordinates": {
          "latitude": 30.438837,
          "longitude": -97.77581
        },
        "place_id_search": "https://serpapi.com/search.json?data=...&engine=google_maps&type=place",
        "rating": 3.1,
        "reviews": 545,
        "type": "2-star hotel",
        "price": "$50",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "Holiday Inn Express & Suites Austin NW - Four Points by IHG",
        "data_id": "0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "data_cid": "3296625529810634250",
        "place_id": "ChIJb3oIl7YzW4YRCqboDAtGsi0",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "gps_coordinates": {
          "latitude": 30.421156,
          "longitude": -97.847103
        },
        "place_id_search": "https://serpapi.com/search.json?data=...&engine=google_maps&type=place",
        "rating": 4.3,
        "reviews": 694,
        "type": "3-star hotel",
        "price": "$66",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh3.googleusercontent.com/p/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of vacation_rentals
When searching for a city or region, vacation_rentals can appear alongside hotels. Each rental includes property_type (e.g. "House", "Apartment"), capacity (e.g. "Sleeps 4"), price, check_in_date, and gps_coordinates.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "vacation_rentals": [
      {
        "position": 1,
        "title": "HGTV Featured Tiny Home w Hot Tub Near East 6th St",
        "data_id": "0x0:0xac0984808e4cd9b2",
        "data_cid": "12396527001155799474",
        "place_id": "CgkRstlMjoCECaw",
        "gps_coordinates": {
          "latitude": 30.264395,
          "longitude": -97.719292
        },
        "property_type": "House",
        "capacity": "Sleeps 4",
        "price": "$101",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh5.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "Elegant Escape | Gourmet Kitchen + Outdoor Living",
        "data_id": "0x0:0x80a508e0b1cac36b",
        "data_cid": "9260427849499591531",
        "place_id": "CgkRa8PKseAIpYA",
        "gps_coordinates": {
          "latitude": 30.318434,
          "longitude": -97.72496
        },
        "property_type": "House",
        "capacity": "Sleeps 8",
        "price": "$164",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of neighborhoods
When searching for a city or region, neighborhoods can appear in the place results. Each neighborhood includes a description and thumbnail, along with links to reviews and photos.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "neighborhoods": [
      {
        "position": 1,
        "title": "Downtown Austin",
        "data_id": "0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "data_cid": "1144268399771573158",
        "place_id": "ChIJb1fyIgq1RIYRpsulrOHW3g8",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "description": "Texas State Capitol & bustling nightlife",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "South Congress",
        "data_id": "0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "data_cid": "8926785009455398504",
        "place_id": "ChIJhzA936a0RIYRaMyqhF-b3Hs",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "description": "Continental Club, cool shops & eateries",
        "thumbnail": "http://lh6.googleusercontent.com/proxy/..."
      },
      {
        "position": 3,
        "title": "Zilker",
        "data_id": "0x8644b5213187c143:0x58356ef955bfbf77",
        "data_cid": "6355073261411147639",
        "place_id": "ChIJQ8GHMSG1RIYRd7-_VfluNVg",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b5213187c143:0x58356ef955bfbf77",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b5213187c143:0x58356ef955bfbf77",
        "description": "Trendy eateries & bars near Zilker Park",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Results for: Maid2Clean
These results contain booking_link.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!3m1!4b1!4m6!3m5!1s0x487760d5a813a0ed:0xa081a873e2f526a7!8m2!3d52.6360771!4d-1.1311002!16s%2fg%2f11b6j113kn

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!3m1!4b1!4m6!3m5!1s0x487760d5a813a0ed:0xa081a873e2f526a7!8m2!3d52.6360771!4d-1.1311002!16s%2fg%2f11b6j113kn",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "booking_link": "https://www.maid2clean.co.uk/book-a-cleaner/?id=61&utm_source=gmb&utm_medium=organic",
    "website": "https://www.maid2clean.co.uk/domestic-cleaning/leicester/?utm_source=gmb&utm_medium=organic",
    "phone": "+44 116 356 0126",
    "open_state": "Closes soon ⋅ 8:30 PM ⋅ Opens 9 AM Wed",
    ...
  },
  ...
}
Example of web_results_link
Web Results typically appear at the end of the listing, displaying relevant web pages for the selected place. However, a new request must be made to retrieve the data; thus, we extract the link to retrieve the data as web_results_link. Simultaneously, we also provide serpapi_web_results_link, which returns the parsed results. You can view an example response on Google Organic Results.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJQTNrM69ZwokR3ggxzgeelqQ

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJQTNrM69ZwokR3ggxzgeelqQ",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "web_results_link": "https://www.google.com/search?q=local+guide+program&ibp=gwp;0,26,OiIKICIcR3JlZ29yeXMgQ29mZmVlIE5ldyBZb3JrLCBOWSgC&pcl=lp",
    "serpapi_web_results_link": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&ibp=gwp%3B0%2C26%2COiIKICIcR3JlZ29yeXMgQ29mZmVlIE5ldyBZb3JrLCBOWSgC&q=local+guide+program"
  },
  ...
}
Example with place_id: ChIJLU7jZClu5kcR4PcOOO6p3I0 and optional gl: br parameters
By using gl parameter, you can further improve locale results (e.g. returning the correct currency for a set location).

GET


https://serpapi.com/search.json?engine=google_maps&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0&gl=br

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  gl: "br",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search

JSON Example

{
  ...
  "place_results": {
    ...
    "admission":[
      {
        "title":"Eiffel Tower",
        "icon":"https://www.gstatic.com/ads-travel/ttd/official_admission_32x32.png",
        "options":[
          {
            "title":"Second floor - Stair access",
            "link":"https://www.toureiffel.paris/en/rates-offers/ticket-second-floor-stairs?utm_source=magpietravelgttd",
            "price":"R$87.07",
            "extracted_price":87.07,
            "official_site":true,
            "extensions":[
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      {
        "title":"Myticketsworld",
        "icon":"https://encrypted-tbn2.gstatic.com/faviconV2?url=https://myticketsworld.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options":[
          {
            "title":"The Eiffel Tower’s: Ticket with access to 2nd floor via stairs",
            "link":"https://myticketsworld.com/products/the-eiffel-tower-s-ticket-with-access-to-2nd-floor-via-stairs",
            "price":"R$80.94",
            "extracted_price":80.94,
            "extensions":[
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      ...
    ],
    ...
  },
  ...
Example of booking_options
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJDQR-DiEFdkgRArsxMCL5YCc

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJDQR-DiEFdkgRArsxMCL5YCc",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Big Bus Tours London",
    "place_id": "ChIJDQR-DiEFdkgRArsxMCL5YCc",
    ...
    "booking_options": [
      {
        "title": "Big Bus Tours London",
        "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.bigbustours.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11vblpvzn3",
            "title": "Big Bus London Evening Tour",
            "price": "$47",
            "duration": "2h",
            "rating": 4,
            "reviews": 4132,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.bigbustours.com/en/london/london-evening-tour-ticket?utm_source=GTTD-London&utm_medium=GTTD&utm_campaign=GTTD-London-buy-tickets",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ6a1FDn_saCYu_NCRDPdtHmNB291W_WQceyre_4fXz4rnqaiwyqMRYYDDujsNeZYI",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTy0oSZ0KvjweEYbW6TnpU8cSedqG2JIKOSanRYzVxZg4odyXZpnbQd2Otp8r7gvzE",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT2BPeS4H8pFk6_2jCOm52Ly4HVXSlgT7GUBuul7IgixxNjhuYrTszKZ0udVPoxFT0",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHxJZWgbGdJCEP2I5eMZs-Ob4OCG-YjI3ikgIHJQGA8wlCTk8p6WNZoYuq40or0w"
            ]
          },
          {
            "kgmid": "/g/11vdx9mbg3",
            "title": "Big Bus London Discover",
            "price": "$59",
            "duration": "1d",
            "rating": 4,
            "reviews": 4132,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.bigbustours.com/en/london/london-discover-ticket?utm_source=GTTD-London&utm_medium=GTTD&utm_campaign=GTTD-London-buy-tickets",
            "thumbnails": [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLCs5zzkCnd6Pu8T3NvEgXJFaHLw9f--XMMloExCSJz6_8ApnvtromsTjoc5PN4Y",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRr4oeojjwwNJlIEa70VkQBMdjh4JJJijOTThmSOqv6lmA08b7GuxXRO2CKfd2sgaM",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQKoVNgwb1q0RQbWNw3tiSdgBJanPF9MFLnsefjDICRnDxC2vhzHNsCXTU0o-VQtuw",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKxrcWkG30xMbMJxiXQGaDVWoBPlGnwfEamyKpUr5E7IqOqgsGxZNGNytfJ2l_-8s"
            ]
          },
          ...
        ]
      },
      {
        "title": "Civitatis",
        "source_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.civitatis.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11vjhc_79t",
            "title": "Madrid Navibus Tour",
            "price": "$11",
            "rating": 3.3,
            "reviews": 197,
            "link": "https://www.civitatis.com/redirect-ttd/174702/o?lang=en-US&currency=USD",
            "thumbnails": [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1iq4wAjtqR_3mfvsmPBWqFjwUGHuK3MbMrPiVnleyGZ0hr362Nu-PrSj7xOnfNZM",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFV0lQQDfwxayxd6Fu7FsTjYcAMX8soNHrf2fDmW9mQgmNPreLZzOvy5bfSFDWPiA",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlrZdillZ7gnpSDhlDL3i92LupC3K4eaj5DAartg4tsM61bG_4xK9_FQm897DI794",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEWI5INXzwfkEoiyXfVmFxS0XldbmeZCtz2QkgB9hAeFv8dod-Z-wj6ycrIhtB4A"
            ]
          },
          {
            "kgmid": "/g/11w3m3wn6t",
            "title": "Big Bus: Rome Sightseeing Bus",
            "price": "$20",
            "rating": 4.0,
            "reviews": 91,
            "link": "https://www.civitatis.com/redirect-ttd/180212/o?lang=en-US&currency=USD",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTv6a031OqTXFa9NAOqnc_H6DKfzTCZtmut-YlbfJjocpBV1R4fMlwQsVlYFHclb1I",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSVPy8hik4y0zdJZO_eLi5FT_b-cnbHxDQoe1CtmzNS5x5_Bo9si22x2crkV6rin_I",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTbglhthLuX3B2pgckha3pA3Tc_Vr8bgaC0cfKJUVQNhYFXJiYSzNBkUcF7XQeiBM",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSIKPWsnwUd3rELZU6WHiuW4SzRflrqBp3_En4GgDKgslgG2TVJQ3o1q5A3MeWoODg"
            ]
          },
          ...
        ]
      },
      ...
      {
        "title": "Viator",
        "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.viator.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11q9tyzcvt",
            "title": "Big Bus London Open-Top Evening Tour",
            "price": "$47",
            "duration": "2h",
            "rating": 3.9,
            "reviews": 141,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.viator.com/en-US/London/d737-ttd/p-6506P2?googlettd=true&src=papi&campaign=o&surface=maps&funnel=nav",
            "thumbnails": [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS88W75H3EgH8iYuwHjp80ve1Fhh_davgcurnkxsUuySnBmnM0lHIYhwN4shWvo5z0",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSacWh4msJThCdYowwAdVJnsExcdsXwFhoSoEpel4JFy75yw2zNOYzaBwnMaiW3uRo",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZ1gbO7YyK115M8o6ZV0sSbTRW4iSzp8gcFJel88TZ-5ALLa4hrf-iaUePc4Z4Pdg",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRamSpS07guVKHDzxdRaymlUAg2gln-B_m1PUmCdXDnYhMtidNqxw9uzkHEQONAURM"
            ]
          },
          {
            "kgmid": "/g/11syfqkh2r",
            "title": "Big Bus London Hop-On Hop-Off Tour & River Cruise",
            "price": "$51",
            "duration": "3h 30m",
            "rating": 3.8,
            "reviews": 9633,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.viator.com/en-US/London/d737-ttd/p-6506LONHOHO?googlettd=true&src=papi&campaign=o&surface=maps&funnel=nav",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_clWIIcXOSfylXJ6193DMnbDfP9lR-nulel0N3G7BJEQkNuVUmU7zwzquqXmwom4",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShmhVzYFOxuaajEe1oI2zKSJmI_-HJE6-DusN9DvNLb7KsRldR5DWd8LIPwTNUV3s",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMEVsGOoqOhunHfl8vKBDW8oczOkh4CdhFTfbLJoTl3Kx6FcpSxNV_98RhibPN9gQ",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQLPqjkF0qAkp8H0poLACPhyd03Pjvw35p_CgWRP2pJdBzaTbEyBBMXnco295uONlo"
            ]
          },
          ...
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of price_details
price_details consist of different price groups and their distribution percentages.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJ9Sto4ahZwokRXpWiQYiOOOo

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJ9Sto4ahZwokRXpWiQYiOOOo",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "price": "$10–20",
    "price_details": {
      "distribution": [
        {
          "price": "$1–10",
          "percentage": 14.473684210526317,
          "reported_count": 33
        },
        {
          "price": "$10–20",
          "percentage": 66.22807017543859,
          "reported_count": 151
        },
        {
          "price": "$20–30",
          "percentage": 15.350877192982457,
          "reported_count": 35
        }
      ],
      "total_reported": 228
    },
    ...
  },
  ...
}
Example of images.last_updated
Some images may include information about when they were updated.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJv-CygqQsDogRfgd52uaGbCI

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJv-CygqQsDogRfgd52uaGbCI",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "images": [
      {
        "title": "All",
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMiY1bRS7qXbaCvxg2ehE4tC3rccMVaJUebmDdh=w390-h298-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/Djdbt3icuxmfUVJSUGylr5-TYayXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFngmxlpmBQUbF4YkZToXFaRbpSa4WpS4mxclJzsG5boFZqalOuSkmFbbmxpoJthZGmhm62blw8A06sh2g"
      },
      {
        "title": "Latest",
        "last_updated": "3 days ago",
        "thumbnail": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwU0Zo3c984vZJfKV14SOSXQTFOM8YXXjt3FNGeDOLaIpcbZH78PrRZycg39cO1lHQt2cxZBIX75L54KCn8tC7lgT7OMo4ZdkgC3aVJUPo59JBWY6cW9I6BlNqpFD7lFiEJ_Cx6kVwJUko=w224-h398-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/vNYuf3icBcHtVoIwGADgK5ooG2zrnH4EhjI_piGI-9OxNxrGYuRW2EV2Ad1Nz_P323o_uLsgMC2eaGu1ab5ccwXb-6b3E7AfgR4cAodc8LCYXkwxllNlMXBGvpV4W1UzUsii3h8yuWGnun73ONsumrlcn_MBXtSSst31Sf2AxhzkzCz3PoSbSvKaRuuIrNKe-ZQafaByY4l67XSKz5UodzbiIjmeYjjyPE7M9nPI5tRkl0fxnN7irhpF2dn7MQwJajFnqEO9_Qcgy0Sx"
      },
      {
        "title": "Videos",
        "thumbnail": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyXbRwLCS1yeFSUozV7xxdYI11ZkeB5vZ3p3rzQiCZNrbkY1AplzIg0M4VCw2blGT4jzSorXBYemTKcefxd2vyqeR-lMHf6d7P3MsGIAUh8qMeokgdElMn_VgcRdkb-fbNeB3U=w529-h298-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/pc4jdnicBcFbjoIwFADQFVWE6vhI_AAywxCtURAi_Ji0vRRtpUhRHvtzEe7Gcz7vsm1rs7YsVeKJ0FooeBpomK5aqNoJ03dL1AYxg4zlBtOrioczjbqdH9sD_MWJHtNF3_MstO1cgjd_5bjGzXi8-vm-oTKz3VqNoZiSWep3DlXBaXYbY92cvQzupy2DoufOa3hAhBT5L3744oCJCUI3KZcPAloK_qtIdUkFi7ikqKB78HCy6ebOCpXOaokkqvQXPSZFog"
      },
      ...
    ],
    ...
  },
  ...
}
Example of detailed description
Some places may have detailed description with the additional link and source fields.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJiQHsW0m3j4ARm69rRkrUF3w

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJiQHsW0m3j4ARm69rRkrUF3w",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "description": {
      "snippet": "Mountain View is a city in Santa Clara County, California, United States, part of the San Francisco Bay Area. Named for its views of the Santa Cruz Mountains, the population was 82,376 at the 2020 census.",
      "link": "https://en.wikipedia.org/wiki/Mountain_View,_California",
      "source": "Wikipedia"
    },
    ...
  },
  ...
}
Example of opens_date
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJqQNCxg0DdkgRlMjaw8YYzvE

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJqQNCxg0DdkgRlMjaw8YYzvE",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Connie's Pizza",
    "opens_date": "Opens 26 Jan",
    "place_id": "ChIJqQNCxg0DdkgRlMjaw8YYzvE",
    ...
  },
  ...
}
Example of unclaimed_listing
Some business places are not yet claimed. These places will have the field "unclaimed_listing" set to true.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJzVcorM1ZwokRZZIrWe_tQ-8

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJzVcorM1ZwokRZZIrWe_tQ-8",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

  {
    ...
    "place_results": {
      ...
      "title": "BBQ Stand",
      "place_id": "ChIJzVcorM1ZwokRZZIrWe_tQ-8",
      ...
      "unclaimed_listing": true,
      ...
    },
    ...
  }
Api Status ‧GitHub ‧Legal ‧Security ‧Libraries ‧Release Notes ‧Public Roadmap ‧Support
© 2016-2026 SerpApi, LLC.                                                   Google Maps Place Results API
The Google Maps Place Results API allows a user to scrape the results of a Google Maps Place. SerpApi is able to make sense of this information and extract a place_results object.

This object can contain title, reviews, rating, price, type, events, address, booking_link, phone, description, open_state, hours, check_in_time, check_out_time, extensions ("highlights", "accessibility", "crowd", "payments", etc.), images ("title", "thumbnail"), user_reviews ("summary", "most_relevant", etc.), thumbnail, gps_coordinates, data_id, data_cid (also known as CID or ludocid), links, people_also_search_for, similar_places_nearby, hotels, vacation_rentals, neighborhoods and more.


The API endpoint is https://serpapi.com/search?engine=google_maps

Head to the playground for a live and interactive demo.

To scrape Google Maps Place results with SerpApi, create a search with these parameters:

API Parameters
type

Required

Parameter must be set to place. (I.e., type=place)

Parameter is not required when using place_id.

data

Required

Parameter must be set in the next format: !4m5!3m4!1s + data_id + !8m2!3d + latitude + !4d + longitude

Parameter is not required when using place_id.

place_id

Optional

Parameter defines the unique reference to a place on a Google Map. Place IDs are available for most locations, including businesses, landmarks, parks, and intersections. You can find the place_id using our Google Maps API.

You can read more about Place IDs here.

place_id can be used without any other optional parameter.

gl

Optional

Parameter defines the country to use for the Google Maps search. It's a two-letter country code. (e.g., us for the United States, uk for United Kingdom, or fr for France). Head to the Google countries page for a full list of supported Google countries.

Parameter only affects Place Results API.

API Examples
Place results overview
These kind of results represent Google Maps place results. They cover specific locations and places (e.g. stores, offices, hotels, monuments, cities, provinces, countries, etc.).

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Stumptown Coffee Roasters",
    "place_id": "ChIJT2h1HKZZwokR0kgzEtsa03k",
    "data_id": "0x89c259a61c75684f:0x79d31adb123348d2",
    "data_cid": "8778389626880739538",
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259a61c75684f%3A0x79d31adb123348d2&engine=google_maps_reviews&hl=en",
    "photos_link": "https://serpapi.com/search.json?data_id=0x89c259a61c75684f%3A0x79d31adb123348d2&engine=google_maps_photos&hl=en",
    "gps_coordinates": {
      "latitude": 40.7457399,
      "longitude": -73.9882272
    },
    "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a61c75684f%3A0x79d31adb123348d2%218m2%213d40.7457399%214d-73.9882272&engine=google_maps&google_domain=google.com&hl=en&type=place",
    "provider_id": "/g/1hhw712x0",
    "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNtnPBJ2Oi_C2YNamHTXyqU9I8mRBarCIvM5g5v=w129-h86-k-no",
    "serpapi_thumbnail": "https://serpapi.com/images/url/zzeDQHicuxmXUVJSUGylr5-TYaqXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFngV5IX4ORl5J8Z72wU6ZeY6xESUVkYaulpkRvklFjk7Fnma5puWmZbbmhkqZthYaabrZuXDwCjYyEZ",
    "rating": 4.5,
    "reviews": 1388,
    "price": "$$",
    "type": [
      "Coffee shop",
      "Cafe",
      "Coffee store",
      "Tea store"
    ],
    "type_ids": [
      "coffee_shop",
      "cafe",
      "coffee_store",
      "tea_store"
    ],
    "description": "Coffee bar chain offering house-roasted direct-trade coffee, along with brewing gear & whole beans",
    "menu": {
      "link": "http://places.singleplatform.com/stumptown/menu?ref=google",
      "source": "places.singleplatform.com"
    },
    "order_online_link": "https://food.google.com/chooseprovider?restaurantId=/g/1hhw712x0&g2lbs=AL1YbfXV3ifVlyOlkMh7ewBcAt914i9WDkvURcwf5YlOzyFa_R9Jb2K5zKhdkPzNSOuEWmKweSn2qWtlQ0D2tDEMrkza6JVW06Kx2HCR8AyC9TOmnr89N4U%3D&hl=en-US&gl=us&fo_m=MfohQo559jFvMWvkddHzV46uMT_RFPQ05bfKMQVr5-7IofUJMU_hT8vrWuwRMUv3d8yCO4PgMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=3C40Y7C_F6OJ0PEPmYiSwAQ&ei=3C40Y7C_F6OJ0PEPmYiSwAQ&fo_s=OA,AH,SOE",
    "service_options": {
      "dine_in": true,
      "takeout": true,
      "delivery": false
    },
    "extensions": [
      {
        "highlights": [
          "Fast service",
          "Great coffee",
          "Great tea selection"
        ]
      },
      {
        "popular_for": [
          "Breakfast",
          "Solo dining",
          "Good for working on laptop"
        ]
      },
      {
        "accessibility": [
          "Wheelchair accessible entrance",
          "Wheelchair accessible restroom",
          "Wheelchair accessible seating"
        ]
      },
      ...
    ],
    "unsupported_extensions": [
      {
        "accessibility": [
          "Wheelchair accessible parking lot"
        ]
      },
      {
        "planning": [
          "Accepts reservations"
        ]
      }
    ],
    "address": "18 W 29th St, New York, NY 10001",
    "located_in": "Ace hotel New York",
    "website": "https://www.stumptowntogo.com/",
    "phone": "(855) 711-3385",
    "open_state": "Open ⋅ Closes 5PM",
    "plus_code": "P2W6+7P New York",
    "hours": [
      {
        "wednesday": "6:30AM–5PM"
      },
      {
        "thursday": "6:30AM–5PM"
      },
      {
        "friday": "6:30AM–5PM"
      },
      ...
    ],
    "images": [
      {
        "title": "All",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNtnPBJ2Oi_C2YNamHTXyqU9I8mRBarCIvM5g5v=w447-h298-k-no"
      },
      {
        "title": "Latest",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNJMj0YyZ-_ebLvyojnTwTHMG_-7lyjVE1gXVV8=w224-h298-k-no"
      },
      {
        "title": "Menu",
        "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipPBMJ-jooeY_UYrvbV10Fvjs7tswXTKuny-Mx5i=w224-h298-k-no"
      },
      ...
    ],
    "user_reviews": {
      "summary": [
        {
          "snippet": "\"The baristas here are pretty cool people who pull excellent espresso shots.\""
        },
        {
          "snippet": "\"Long lines every morning, but the staff moves everyone through pretty quickly.\""
        },
        {
          "snippet": "\"Prices were a little pricey for size on the iced coffees.\""
        }
      ],
      "most_relevant": [
        {
          "username": "Peter Farejowicz",
          "rating": 5,
          "contributor_id": "103688512592452127720",
          "description": "Another great Stumptown location, I’m a big fan of their coffee anywhere. This particular spot is conveniently located near Madison Square Park off Broadway. The shop has some space inside to sit along the window but is mostly a grab and go location.\n\nThe line wasn’t too bad and I got my drip coffee quickly. The prices here to me are very reasonable and the sizes great.\n\nStumptown coffee blends are always a hit and getting it straight from the source tastes extra delicious in the mornings!",
          "images": [
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipMvfI5qn5wgCAsb8qLHZzIOaCgDJNHECrsC4mzs=w150-h150-k-no-p"
            },
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipO9qil4-umhwP8tXcvx9nw8U8VD2XX7xs6lhV0n=w150-h150-k-no-p"
            },
            {
              "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNibYeSBKZ5EmpiR672P8VTXy88soG1b333Olkg=w150-h150-k-no-p"
            }
          ],
          "date": "a month ago"
        },
        ...
      ]
    },
    "people_also_search_for": [
      {
        "search_term": "Coffee shops",
        "local_results": [
          {
            "position": 1,
            "title": "Culture Espresso",
            "data_id": "0x0:0x88ca3d6ff537d876",
            "data_cid": "9856758285518493814",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0x88ca3d6ff537d876&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0x88ca3d6ff537d876&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.7520746,
              "longitude": -73.9857387
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0x88ca3d6ff537d876%218m2%213d40.7520746%214d-73.9857387&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.5,
            "reviews": 1183,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOfqz4XRKZLCTff5ZIAT5CnwAMivcRhzvw6TYqA=w156-h156-k-no-pi0-ya240-ro0-fo100",
            "type": [
              "Espresso bar",
              "Bakery",
              "Cookies"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Coffee roasters",
        "local_results": [
          {
            "position": 1,
            "title": "Irving Farm New York",
            "data_id": "0x0:0xb7d1c448bc0e0f46",
            "data_cid": "13245583795745066822",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0xb7d1c448bc0e0f46&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0xb7d1c448bc0e0f46&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.736810299999995,
              "longitude": -73.9869409
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0xb7d1c448bc0e0f46%218m2%213d40.736810299999995%214d-73.9869409&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.2,
            "reviews": 552,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipN8U4YuUu1pS9PxWeJ-C6BcuKz-fo7pGX1qJ3Gk=w156-h156-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Other locations for Stumptown",
        "local_results": [
          {
            "position": 1,
            "title": "Stumptown Coffee Roasters",
            "data_id": "0x0:0x3034ad801dc5fcb3",
            "data_cid": "3473591978376428723",
            "reviews_link": "https://serpapi.com/search.json?data_id=0x0%3A0x3034ad801dc5fcb3&engine=google_maps_reviews&hl=en",
            "photos_link": "https://serpapi.com/search.json?data_id=0x0%3A0x3034ad801dc5fcb3&engine=google_maps_photos&hl=en",
            "gps_coordinates": {
              "latitude": 40.7328275,
              "longitude": -73.9979664
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x0%3A0x3034ad801dc5fcb3%218m2%213d40.7328275%214d-73.9979664&engine=google_maps&google_domain=google.com&hl=en&type=place",
            "rating": 4.5,
            "reviews": 1137,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOAlU-xDa_lDuFCdsuJ66-6NQpETZi1YWSqbXdx=w156-h156-n-k-no",
            "type": [
              "Coffee shop",
              "Cafe",
              "Coffee store",
              "Tea store"
            ]
          }
        ]
      }
    ],
  }
  ...
}
Example of extensions
These results are available under expanded description and can contain various extensions information, including highlights, crowd, accessibility, payments, etc.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "extensions": [
      {
        "highlights": [
          "Fast service",
          "Fireplace",
          "Great coffee",
          "Great tea selection",
          "Live performances"
        ]
      },
      {
        "popular_for": [
          "Solo dining"
        ]
      },
      {
        "accessibility": [
          "Wheelchair accessible restroom"
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of popular_times
Some places include "Popular times" section with the per-hour/day details about busyness state.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJNc-tXDMbdkgRK71JU82ZU38

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJNc-tXDMbdkgRK71JU82ZU38",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "popular_times": {
      "current_day": "thursday",
      "live_hash": {
        "info": "Less busy than usual",
        "time_spent": "People typically spend 45 min to 1.5 hr here"
      },
      "graph_results": {
        "sunday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "busyness_score": 0
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 50
          },
          ...
        ],
        "monday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 20
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 47
          },
          ...
        ],
        "tuesday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 33
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 63
          },
          ...
        ],
        "wednesday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 26
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 42
          },
          ...
        ],
        "thursday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 34
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 65,
            "live_busyness_score": 15,
            "current": true
          },
          ...
        ],
        "friday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "info": "Usually not too busy",
            "busyness_score": 25
          },
          {
            "time": "8 AM",
            "info": "Usually not too busy",
            "busyness_score": 33
          },
          ...
        ],
        "saturday": [
          {
            "time": "6 AM",
            "busyness_score": 0
          },
          {
            "time": "7 AM",
            "busyness_score": 0
          },
          {
            "time": "8 AM",
            "info": "Usually a little busy",
            "busyness_score": 55
          },
          ...
        ]
      }
    },
    ...
  },
  ...
}
Example of hours and hours_last_updated
Besides the "Hours" section, some places may also include information about when the hours were last updated.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJSWN4ldUEdkgRGqo3OSnf1CY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJSWN4ldUEdkgRGqo3OSnf1CY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "hours": [
      {
        "thursday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "friday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "saturday": "9 AM–10:30 PM"
      },
      {
        "sunday": "11:30 AM–9 PM"
      },
      {
        "monday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "tuesday": "7:30–10:30 AM, 12–10:30 PM"
      },
      {
        "wednesday": "7:30–10:30 AM, 12–10:30 PM"
      }
    ],
    "hours_last_updated": "Confirmed by this business 4 weeks ago",
    ...
  },
  ...
}
Example of location_summary
Some places include "Location summary" section with the details about neighborhood, popular places and transit options.

GET


https://serpapi.com/search.json?engine=google_maps&type=search&q=Soho+House+Chicago

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "search",
  q: "Soho House Chicago",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "location_summary": {
      "neighborhood": {
        "title": "Fulton Market District",
        "data_id": "0x880e2cd089e3e49d:0x634c70bc48c1aeb3",
        "data_cid": "7155217861961690803",
        "place_id": "ChIJneTjidAsDogRs67BSLxwTGM"
      },
      "description": "Hip area with modern dining on West Fulton Market St., lively cocktail bars & music venues.",
      "ratings": {
        "total": {
          "value": 4.271208995537456,
          "verdict": "Great for visitors"
        },
        "proximity_to_things_to_do": {
          "value": 4.615718867223665,
          "verdict": "Excellent"
        },
        "proximity_to_transit": {
          "value": 4.6433318718140795,
          "verdict": "Excellent"
        },
        "airport_access": {
          "value": 4.149301485215413,
          "verdict": "Great"
        }
      },
      "things_to_do": [
        {
          "title": "The Art Institute of Chicago",
          "data_id": "0x880e2ca3e2d94695:0x4829f3cc9ca2d0de",
          "data_cid": "5199955304902742238",
          "place_id": "ChIJlUbZ4qMsDogR3tCinMzzKUg",
          "description": "Renowned art museum holding nearly 300,000 works from all over the world, spanning many centuries.",
          "rating": 4.8,
          "reviews": 35520,
          "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvTWvn4iNr2ESmVIXRdEFpvVGvQS5lW_EpHfC3u4wCpUtk1BBb",
          "gps_coordinates": {
            "latitude": 41.8796031,
            "longitude": -87.6223504
          }
        },
        ...
      ],
      "transit": [
        {
          "title": "Ogilvie Transportation Center",
          "data_id": "0x880e2cc71c0b855f:0xb098c28fb3a60491",
          "data_cid": "12725134669585450129",
          "place_id": "ChIJX4ULHMcsDogRkQSms4_CmLA",
          "gps_coordinates": {
            "latitude": 41.8831389,
            "longitude": -87.6404919
          },
          "travel_options": [
            {
              "mode": "Walking",
              "time": "10 min"
            }
          ]
        },
        ...
      ],
      "airports": [
        {
          "title": "Chicago O'Hare International Airport",
          "data_id": "0x880fb4276a7762f3:0x511747070259ad4b",
          "data_cid": "5843217136966282571",
          "place_id": "ChIJ82J3aie0D4gRS61ZAgdHF1E",
          "gps_coordinates": {
            "latitude": 41.9794444,
            "longitude": -87.9075
          },
          "travel_options": [
            {
              "mode": "Driving",
              "time": "28 min"
            },
            {
              "mode": "Transit",
              "time": "54 min"
            }
          ]
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of posts ("From the owner")
For each Local Posts ("From the owner") result, we are able to extract its media (image or video), cta (Call To Action, e.g. "Order online", "View Offer", "Book"), link (for "Book" and "Order online" cta), phone (for "Call now" cta), post_link, description, duration (e.g. "Jan 14 - Feb 5"), and date.

To scrape all posts use serpapi_posts_link, which points to our full Google Maps Posts API engine.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJl0kwjOJYwokRjO41zufkr_w

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJl0kwjOJYwokRjO41zufkr_w",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "serpapi_posts_link": "https://serpapi.com/search.json?data_id=0x89c258e28c304997%3A0xfcafe4e7ce35ee8c&engine=google_maps_posts",
    "posts": [
      {
        "title": "In need of catering? 🍕",
        "media": "https://lh3.googleusercontent.com/geougc/AF1QipMgVEIERuF51zyOgEW7O21TtvgVWoyyt88SnIkB=h400-no",
        "cta": "Order online",
        "link": "https://slicelife.com/restaurants/ny/new-york/10017/la-vera-pizzeria-restaurant/menu?utm_source=gmb_event&utm_campaign=gmb_event_9704_v498_14_01_2025",
        "post_link": "https://search.google.com/local/posts?q=La+Vera+Pizzeria+%26+Restaurant&ludocid=18208023502730423948&lpsid=CIHM0ogKEICAgIC_8palYQ&source=sh/x/localposts&lsig=AB86z5Usfb0cPwzraSkUHAR4qsX8",
        "description": "We’ve got you covered! Our catering options are perfect for any event, big or small. Let us help make your occasion memorable. 🍾",
        "duration": "Jan 14 - Feb 5",
        "date": "Jan 14, 2025"
      },
      ...
    ],
    ...
  },
  ...
}
Example of user_reviews
These results can contain various user review information, including rating, number of reviews, user_reviews with a summary, topics, and most_relevant reviews. To scrape all reviews use reviews_link, which points to our full Google Maps Reviews API engine.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT994RulZwokRdgqQX0zc3QY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT994RulZwokRdgqQX0zc3QY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259e94678df4f%3A0x6dddc4c5f900a76&engine=google_maps_reviews&hl=en",
    "rating_summary": [
      {
        "stars": 1,
        "amount": 29
      },
      {
        "stars": 2,
        "amount": 32
      },
      {
        "stars": 3,
        "amount": 63
      },
      {
        "stars": 4,
        "amount": 155
      },
      {
        "stars": 5,
        "amount": 1178
      }
    ],
    "rating": 4.7,
    "reviews": 1457,
    "user_reviews": {
      "summary": [
        {
          "snippet": "\"The croissant had a crispy cookie-like crust and buttery interior layers.\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjW3LrrVwi-mDW5WQKHXOamURBu-eEORn8gD4ZzWQ3IMFrFb_ts=s40-k-cc-rp-mo"
        },
        {
          "snippet": "\"Nice space, outdoor seating, excellent small selection of food treats...\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjX9W035tROPs9DeeHmntbtSmuDq4IGFQ8bPYfV6AsVqkQfs7My6LQ=s40-k-cc-rp-mo"
        },
        {
          "snippet": "\"Very good cardamom bun, good hot chocolate, nice service, pretty atmosphere\"",
          "thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjXVXV9eQhocOs39bkOyxZYUU1DtF7OVTaS_FF7c6QaHi1aeh-pP=s40-k-cc-rp-mo"
        }
      ],
      "topics": [
        {
          "keyword": "cardamom bun",
          "mentions": 243,
          "id": "/g/11lrwk1gqj"
        },
        {
          "keyword": "canele",
          "mentions": 41,
          "id": "/m/08gks_"
        },
        {
          "keyword": "almond croissant",
          "mentions": 32,
          "id": "/g/11ny2yf91k"
        },
        ...
      ],
      "most_relevant": [
        {
          "username": "Inger Margrete Hansen",
          "rating": 4,
          "contributor_id": "112345261084793229724",
          "user_review_count": 808,
          "user_photo_count": 2793,
          "user_thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjWHjcM3Ac6Cp_TmyPCibNdwNZz1dM3WOAmiAVA8I0h1h77i_oO5=s120-c-rp-mo-ba6-br100",
          "description": "As someone from Denmark, La Cabra has always been a familiar refuge — a place where coffee is treated with the same quiet rigour and curiosity that shaped its beginnings in Aarhus. Their approach is built on intention: one roast profile, chosen at the cupping table, meant to reveal the coffee’s character rather than manipulate it.\n\nI wasn’t expecting a queue for something that feels so intrinsically like home, but that’s New York asserting itself. The space was lovely, the coffee tasted exactly as it should — clean, bright, and grounded in the philosophy they’ve carried from Aarhus to Copenhagen to here — yet the rush of the café stole a bit of the calm I usually associate with La Cabra. More of the city’s energy than the café’s fault, but still noticeable.\n\nStill, it was a comfort to sit there, coffee in hand, knowing the same careful decisions underpin every cup on both sides of the Atlantic.",
          "link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21JMlpFUnlWa3hLTURkdWVFUklkblpLV0d4R1pGRRAB!2m1!1s0x0:0x6dddc4c5f900a76!3m1!1s2@1:CAIQACodChtycF9oOmI2ZERyVkxKMDdueERIdnZKWGxGZFE%7C0dCfNrN99Wx%7C?hl=en-US",
          "images": [
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38uexxxvXfuZKQvXxlu727wdQIlLyEBVJC5YH2n0lGLonK8FVaAtxJFECzn9CcynYa6EXaL1q692W7Zx_9AczOxk2PzDJf5fO2Wi1V738wFTGC159bPilqJCzlolGv4iQjNhNYNiP98mlRBZ"
            },
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38sjr7a8rB9RzZkQQcYRSL8DM_J99tOS_S-5AENSxcr6ZGjVbhWc0JIAwN-Nww9BKve_mX43bdPyi_XLsNG-m4Z-wK9F6OosoypjvL8N407cybue13r4BbtKiArwAgEED90w4QvlkyhbsHuh"
            },
            ...
          ],
          "date": "a month ago",
          "date_iso8601": "2025-12-08T11:27:51+00:00"
        },
        {
          "username": "Wade Hannah Aaron",
          "rating": 5,
          "contributor_id": "107763711468134518584",
          "user_review_count": 122,
          "user_photo_count": 330,
          "user_thumbnail": "https://lh3.googleusercontent.com/a-/ALV-UjUKEsNIb3pBNTDa9BZB0hK-sQGi_5Kz5yDBwtfa-8krB2uLv7brXw=s120-c-rp-mo-ba4-br100",
          "description": "The place is bumping. Lively atmosphere with the music. Baristas were on top of their game. Had a really good pour over. It was on point. The pastry I had was great too. If you have some extra money to spare get one of the pour overs. It’s on the next page of the menu. I tried a sample of their drip, don’t think I would drink their drip. I would go for the pour over menu or espresso.",
          "link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2taSVRGVm1iWHByWmtGalNGSlZNR1JwYjNCWlFWRRAB!2m1!1s0x0:0x6dddc4c5f900a76!3m1!1s2@1:CAIQACodChtycF9oOkZITFVmbXprZkFjSFJVMGRpb3BZQVE%7C0d4rLJQAh5x%7C?hl=en-US",
          "images": [
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38vANNA_K8WHFEDqeIoT6FAjtrQda4cxBY5nBob7cNao8pQ3alBK05l7SxCpDtVsmS-ODvjp0P6I9tko3Ytf1pk2epGNembcPFquQT0WdVlRXMogFHybzRwRx6P7Un7dMPB9WEqgG-EXIBc"
            },
            {
              "thumbnail": "https://lh3.googleusercontent.com/geougc-cs/AMBA38tw07bHrKIn5SXs1ZjhYoply5STAxpNG9bSw7KpbXaLnJnahDG_dz7x8ECZzsz19EbDOY2OGvBK82E7AfmaKrnw0P1P2gYB8YZdSSQjoohggCks75-uHIAL8o0Nv3ZG-NWcadC0ZRDKhmWG"
            },
            ...
          ],
          "date": "2 months ago",
          "date_iso8601": "2025-11-14T18:31:48+00:00"
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of user_reviews.source
Some places include reviews posted on the other platforms.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT994RulZwokRdgqQX0zc3QY

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT994RulZwokRdgqQX0zc3QY",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "user_reviews": {
      "source": [
        {
          "name": "Tripadvisor",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/icon_100532569.png",
          "source_review_count": 2116,
          "reviews": [
            {
              "rating": 4.2,
              "rating_scale": 5,
              "username": "travelqueenNi",
              "description": "A great stay in the most affordable accommodation I could find for a solo trip to NYC, an easy 2-minute walk from 103rd Street #1 subway station. |I stayed in a 6-bed female dorm and appreciated the privacy curtains on the beds, the individual charging port, and large locker for my things- make sure to bring your own lock.  Sheets, a towel and blanket are also provided.|The hostel was very clean, and most of my fellow travellers were considerate when coming in late at night, although there's always a few that don't know how to be quiet or close a door gently, and you can hear people thumping across the floors above- so bring earplugs if you are a light sleeper. |The bathroom was generally very clean, although they need more than 3 sinks in each, to enable easier handwashing, especially in the morning/ late at night.|It was always nice to get in after a day in the cold- but a cap on the heating would be good- a girl in my room the first 2 nights kept putting it up to 77- it was boiling! |I really appreciated the reasonable prices in the cafe- it was a great place to get breakfast or grab a late night sandwich- I recommend the chipotle chicken panini! |All in all I would happily return for a city break, given the price of hotels in Manhattan.",
              "date": "4 weeks ago",
              "date_iso8601": "2025-12-17T05:00:00+00:00"
            }
          ]
        },
        {
          "name": "Priceline",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/icon_220.png",
          "source_review_count": 67,
          "reviews": [
            {
              "rating": 8.1,
              "rating_scale": 10,
              "username": "William",
              "description": "Positive: The price a d many of the amenities the hotel offers. Negative: The only real complaint I'd say O have is that the staff shuts down bathrooms for cleaning before checkout time when people are trying to get ready to be out by 11:00.  They should do this cleaning early morning or after check out time.",
              "pros": [
                {
                  "description": "The price a d many of the amenities the hotel offers."
                }
              ],
              "cons": [
                {
                  "description": "The only real complaint I'd say O have is that the staff shuts down bathrooms for cleaning before checkout time when people are trying to get ready to be out by 11:00.  They should do this cleaning early morning or after check out time."
                }
              ],
              "date": "2 weeks ago",
              "date_iso8601": "2025-12-28T05:00:00+00:00"
            }
          ]
        },
        {
          "name": "Trip.com",
          "source_icon": "https://www.gstatic.com/travel-hotels/branding/b8089cb0-34b4-458c-8749-9bc4614baba4.png",
          "source_review_count": 285,
          "reviews": [
            {
              "rating": 4.3,
              "rating_scale": 5,
              "username": "Trip.com Member",
              "description": "This place is a good place to stay good location and friendly staff will be back",
              "date": "2 months ago",
              "date_iso8601": "2025-11-11T05:00:00+00:00"
            }
          ]
        }
      ]
    },
    ...
  },
  ...
}
Example of people_also_search_for
These results contain local_results for various search terms that people also search for.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x89c259a61c75684f%3A0x79d31adb123348d2!8m2!3d40.7457413!4d-73.98820049999999",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "people_also_search_for": [
      {
        "search_term": "Coffee shops",
        "local_results": [
          {
            "title": "Culture Espresso",
            "data_id": "0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "data_cid": 9856758285518493814,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259aa4c38ca75:0x88ca3d6ff537d876",
            "gps_coordinates": {
              "latitude": 40.752093599999995,
              "longitude": -73.9857349
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259aa4c38ca75%3A0x88ca3d6ff537d876%218m2%213d40.752093599999995%214d-73.9857349&engine=google_maps&token=290cc7f402607b40&type=place",
            "rating": 4.5,
            "reviews": 873,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipOX1xZlGdy6qv0DGAuWY0GUlW0PZQHKqo51Tzfm=w152-h152-n-k-no",
            "type": [
              "Coffee shop",
              "Bakery",
              "Cookies"
            ]
          },
          {
            "title": "Birch Coffee @Flatiron",
            "data_id": "0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "data_cid": 15514259972409934763,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259a65b82f7f7:0xd74db93f308e43ab",
            "gps_coordinates": {
              "latitude": 40.743643399999996,
              "longitude": -73.9864284
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a65b82f7f7%3A0xd74db93f308e43ab%218m2%213d40.743643399999996%214d-73.9864284&engine=google_maps&token=bac233f6ecb0eed9&type=place",
            "rating": 4.4,
            "reviews": 868,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipPeI5KTq8N9oMXldbvDzCInlWE7oj-8E46hDirL=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Coffee roasters",
        "local_results": [
          {
            "title": "Irving Farm New York",
            "data_id": "0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "data_cid": 13245583795745066822,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c259a1c4280bdf:0xb7d1c448bc0e0f46",
            "gps_coordinates": {
              "latitude": 40.736810299999995,
              "longitude": -73.9869409
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259a1c4280bdf%3A0xb7d1c448bc0e0f46%218m2%213d40.736810299999995%214d-73.9869409&engine=google_maps&token=6d251792bf23c62a&type=place",
            "rating": 4.2,
            "reviews": 476,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipN8U4YuUu1pS9PxWeJ-C6BcuKz-fo7pGX1qJ3Gk=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          {
            "title": "City of Saints Coffee Roasters",
            "data_id": "0x89c2599be2211b3d:0xbd935870741bd5ee",
            "data_cid": 13660359334752409070,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c2599be2211b3d:0xbd935870741bd5ee",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c2599be2211b3d:0xbd935870741bd5ee",
            "gps_coordinates": {
              "latitude": 40.7312224,
              "longitude": -73.9899877
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c2599be2211b3d%3A0xbd935870741bd5ee%218m2%213d40.7312224%214d-73.9899877&engine=google_maps&token=63b206fd43182b3d&type=place",
            "rating": 4.6,
            "reviews": 255,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipP5wmDk51ur6RuyEI3Uu5HrNJrkRLzkiBTiSTIq=w152-h152-n-k-no",
            "type": [
              "Coffee shop"
            ]
          },
          ...
        ]
      },
      {
        "search_term": "Other locations for Stumptown",
        "local_results": [
          {
            "title": "Stumptown Coffee Roasters",
            "data_id": "0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "data_cid": 3473591978376428723,
            "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x89c25996d46ccfed:0x3034ad801dc5fcb3",
            "gps_coordinates": {
              "latitude": 40.7327498,
              "longitude": -73.9980013
            },
            "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c25996d46ccfed%3A0x3034ad801dc5fcb3%218m2%213d40.7327498%214d-73.9980013&engine=google_maps&token=c24c0eebe443daa0&type=place",
            "rating": 4.5,
            "reviews": 931,
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipON31ttw5sh7fxIbXtnClymnSzCVgpECLlnXuaO=w152-h152-n-k-no",
            "type": [
              "Coffee shop",
              "Cafe",
              "Tea store",
              "Coffee store"
            ]
          }
        ]
      }
    ],
    ...
  },
  ...
}
Results for: Tryp by Wyndham New York City Times Square
These type of results are for hotels. SerpApi is able to extract, among other data, pricing, amenities, from a source (e.g. "TripAdvisor", "Hotels.com", "Expedia.com", "Booking.com", etc.) and similar_places_nearby (include price, distance, etc.).

   
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJT1lEiK1ZwokRypK1zWcooRo

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJT1lEiK1ZwokRypK1zWcooRo",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "TRYP by Wyndham New York City Times Square South",
    "place_id": "ChIJT1lEiK1ZwokRypK1zWcooRo",
    "data_id": "0x89c259ad8844594f:0x1aa12867cdb592ca",
    "data_cid": "1918859342534513354",
    "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad8844594f%3A0x1aa12867cdb592ca&engine=google_maps_reviews&hl=en",
    "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad8844594f%3A0x1aa12867cdb592ca&engine=google_maps_photos&hl=en",
    "gps_coordinates": {
      "latitude": 40.753779099999996,
      "longitude": -73.9946197
    },
    "place_id_search": "https://serpapi.com/search.json?engine=google_maps&google_domain=google.com&hl=en&place_id=ChIJT1lEiK1ZwokRypK1zWcooRo",
    "provider_id": "/g/1hm58br6y",
    "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMLsvCyWVuMSj-GSzDCCteIcuNTXE8LJfOAZkU8=w152-h86-k-no",
    "serpapi_thumbnail": "https://serpapi.com/images/url/Q6D9LHicuxmXUVJSUGylr5-TYayXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFng61Nc5lwZHlbqG5yl6x5c5eLsXJLqmVzqFxLhauHjlebvGJUdamFbbmhqpJthYaabrZuXDwCwLSFB",
    "rating": 3.5,
    "reviews": 2504,
    "pricing": {
      "for_date": {
        "start": "2026-01-04",
        "end": "2026-01-05"
      },
      "offers": [
        {
          "source": "Hotels.com",
          "price": "£139",
          "link": "https://www.google.com/aclk?sa=l&ai=DChsSEwj25fvp7v2PAxXJqFoFHfNrCPUYACICCAEQTBoCdnU&co=1&ase=2&gclid=EAIaIQobChMI9uX76e79jwMVyahaBR3zawj1EAoYASABEgLLBPD_BwE&category=acrcp_v1_48&sig=AOD64_1anAGVElXpPWkCWw44PhzMqVQnoA&nis=4&adurl"
        },
        {
          "source": "Expedia.co.uk",
          "price": "£139",
          "link": "https://www.google.com/aclk?sa=l&ai=DChsSEwj25fvp7v2PAxXJqFoFHfNrCPUYACICCAEQGBoCdnU&co=1&ase=2&gclid=EAIaIQobChMI9uX76e79jwMVyahaBR3zawj1EAoYAiABEgKs7PD_BwE&category=acrcp_v1_48&sig=AOD64_1Y_94Q6gnHWsjGadbZrJfwWRXirQ&nis=4&adurl"
        },
        ...
      ],
      "all_options": [
        {
          "source": "TRYP by Wyndham New York City Times Square South",
          "price": "£138",
          "link": "https://ad.doubleclick.net/ddm/clk/448223535;252310881;b;u=srch_HPA_WYNDHAM-80004_mapresults_1_GB_desktop_2026-01-04_default___organic%3Fhttps://linkcenterus.derbysoftca.com/dplatform-linkcenter/booking.htm?hotelCode=WYNDHAM-80004&providerHotelCode=WYNDHAM-80004&checkInDate=2026-01-04&checkOutDate=2026-01-05&identifier=wyndham-google&price=185.80&roomTypeCode=A1K&ratePlanCode=SPD6&currency=USD&userCurrency=GBP&language=en&userCountry=GB&testClick=false&sitetype=mapresults&deviceType=desktop&priceDisplayedTax=37.71&priceDisplayedTotal=138.33&partnerId=Wyndham_ds&campaignid=&userlistid=&ifDefaultDate=default&u=srch_HPA_WYNDHAM-80004_mapresults_1_GB_desktop_2026-01-04_default___organic&adults=2&children=0&clk_src=",
          "official_site": true
        },
        {
          "source": "trivago DEALS",
          "price": "£117",
          "link": "https://www.trivago.deals/hotels/united-states_ny_new-york/146463_tryp-by-wyndham-new-york-city-times-square-midtown?checkIn=2026-01-04&checkOut=2026-01-05&placeId=H146463&campaignName=TrivagoDeals_Google_UK&currencyCode=GBP&dealKey=CAIQxwYiDAjIuunGBhCA9rjdASpUDQAAvEIVAAD8QiUAADxBLWZmJkAwATi6AkUAALxCSgsIw7rpxgYQlI29R2IKVHJ5cCBLaW5nIGgCfQAAokGNAa5HvEKVAVK4PkCgAc7VvAioAcgGMI0GOJ_4CECI8A9IAVIIR9Dez-X_MyxYugY&countryCode=GB&languageCode=en&rule=Google_UK&site=mapresults&ads=&origin=31&priceDisplayedTotal=117.23&priceDisplayedTax=37.58&device=desktop&adults=2&children=0"
        },
        {
          "source": "Splitty",
          "price": "£124",
          "link": "https://www.splitty.com/hotels/united-states_ny_new-york/146463_tryp-by-wyndham-new-york-city-times-square-midtown?checkIn=2026-01-05&checkOut=2026-01-06&placeId=H146463&campaignName=GoSplitty_Google_US&currencyCode=USD&dealKey=CAIQ2AIiCwio-47IBhDAxKdnKlgNAADmQhUAAOZCJa5HZUEtAABgQDABOJcCRQAA5kJKDAit6I7IBhDcjNz3AWIKU3RhbmRhcmQgVGgCfY_C2UGCAQCNAVK45kKVAexRgECgAb3yhiKoAcgGMI0GOJ_4CECJ8A9IAVII5v5T6L3BUlNYyAY&countryCode=US&languageCode=en&rule=Google_US&site=mapresults&origin=31&ads=&priceDisplayedTotal=146.23&priceDisplayedTax=49.06&device=desktop&adults=2&children=0"
        },
        {
          "source": "Expedia.com",
          "price": "£150",
          "link": "https://www.expedia.com/Hotel-Search?selected=4621019&startDate=2026-01-05&endDate=2026-01-06&MDPCID=US.META.HPA.HOTEL-ORGANIC-desktop.HOTEL&MDPDTL=HTL.4621019.20260105.20260106.DDT.67.CID..AUDID..RRID.bex_us_desktop&mctc=10&ct=hotel&mpg=USD&mpf=176.06&mpj=49.41&mpl=USD&exp_pg=google&langid=en&ad=2&tp=&utm_source=google&utm_medium=cpc&utm_term=4621019&utm_content=mapresults&utm_campaign=HotelAds&langid=1033&adults=2&children=&rateplanid=382507249&mpm=24&mpn=201388499&mpo=EC&mpp=1"
        },
        {
          "source": "Prestigia.com",
          "price": "£161",
          "link": "https://www.prestigia.com/en/produit.php?idTarget=26977&arrivee=2026-01-05&depart=2026-01-06&pid=16&a=1000129&guestsParams=W3siYWR1bHRzIjoyLCJjaGlsZHJlbiI6MCwiYWdlcyI6W119XQ==&dev=3&pv=MTM3LjM3fDIzLjc2fDAuMDB8ZmFsc2U=&curr=USD&verif=false&ad_click=false&campaign_id=&src="
        },
        ...
      ]
    },
    "type": [
      "Hotel",
      "Inn"
    ],
    "type_ids": [
      "hotel",
      "inn"
    ],
    "description": "Bright rooms in a funky modern lodging offering an airy lobby bistro & a 24-hour fitness center. Set in lower Midtown, this funky modern hotel is 4 blocks from both Penn Station and Madison Square Garden. Bright modern rooms sleep up to 8 guests, and have reclaimed wood floors, free Wi-Fi, flat-screen TVs and iPod docks. Some rooms have game consoles, bunk beds, or fitness rooms with workout equipment. An airy lobby bistro serves breakfast, tapas and cocktails. There's a 24-hour fitness center, along with 5 meeting rooms, including a seasonal rooftop terrace.",
    "amenities": [
      "Free Wi-Fi",
      "Paid breakfast",
      "Paid parking",
      "Air-conditioned",
      "Business center",
      "Pet-friendly",
      "Smoke-free",
      ...
    ],
    "check_in_time": "3:00 PM",
    "check_out_time": "11:00 AM",
    "address": "345 W 35th St, New York, NY 10001, United States",
    "website": "https://www.wyndhamhotels.com/tryp/new-york-city-new-york/tryp-new-york-city-times-square-south-midtown/overview?CID=LC:v6v3hkulmqj2jri:45264&iata=00093796",
    "phone": "+1 212-600-2440",
    "plus_code": "Q234+G5 New York, USA",
    "similar_places_nearby": [
      {
        "position": 1,
        "title": "Hilton Garden Inn New York Times Square South",
        "data_id": "0x89c259ad738c44e1:0xeb832607d63168d1",
        "data_cid": "16970449635962349777",
        "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad738c44e1%3A0xeb832607d63168d1&engine=google_maps_reviews&hl=en",
        "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad738c44e1%3A0xeb832607d63168d1&engine=google_maps_photos&hl=en",
        "gps_coordinates": {
          "latitude": 40.754481999999996,
          "longitude": -73.99359799999999
        },
        "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259ad738c44e1%3A0xeb832607d63168d1%218m2%213d40.754481999999996%214d-73.99359799999999&engine=google_maps&google_domain=google.com&hl=en&type=place",
        "rating": 4.2,
        "reviews": 1846,
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipO2f82eSrGSJv8J9jRxojsi2Tv0QwNwPLzvCbDm=w134-h90-k-no",
        "description": "3-star hotel for £64 less",
        "distance": "0.1 mi away",
        "price": "£74"
      },
      {
        "position": 2,
        "title": "Fairfield by Marriott Inn & Suites New York Manhattan/Times Square South",
        "data_id": "0x89c259ad9cd4b195:0x5d03bf5f4a80e73",
        "data_cid": "418900692903136883",
        "reviews_link": "https://serpapi.com/search.json?data_id=0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73&engine=google_maps_reviews&hl=en",
        "photos_link": "https://serpapi.com/search.json?data_id=0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73&engine=google_maps_photos&hl=en",
        "gps_coordinates": {
          "latitude": 40.754048999999995,
          "longitude": -73.994254
        },
        "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x89c259ad9cd4b195%3A0x5d03bf5f4a80e73%218m2%213d40.754048999999995%214d-73.994254&engine=google_maps&google_domain=google.com&hl=en&type=place",
        "rating": 4.2,
        "reviews": 1629,
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMHTppypzvuPK7rNZFUuXVNF10gmUJEbpLk-YEG=w135-h90-k-no",
        "description": "Also a 4-star hotel, for £20 less",
        "distance": "0.1 mi away",
        "price": "£118"
      },
      ...
    ],
    ...
  },
  ...
}
Example of events
You can get extended events results for concert halls, arenas, theaters etc.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJPS8b1vhYwokRldqq2YHmxJI

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJPS8b1vhYwokRldqq2YHmxJI",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "events": [
      {
        "title": "Joshua Bassett: The Golden Years",
        "date": {
          "start_date": "Tue, Aug 20",
          "start_time": "7:30 PM",
          "when": "Tue, Aug 20 · 7:30 PM"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRlX9dXJLB6I3VlbsBeLcLsnRaQlMQW44HbhcHk5yVg769Ad60h",
        "ticket_info": {
          "price": "$11",
          "extracted_price": 11,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjoshua-bassett-the-golden-years-new-york-new-york-08-20-2024%2Fevent%2F3C0060B98F9F0D92&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Naomi Sharon",
        "date": {
          "start_date": "Thu, Sep 5",
          "start_time": "7:00 PM",
          "when": "Thu, Sep 5 · 7:00 PM"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5mxMiajOufB9x74Wxau4PvmJrmVbxjwZ--tNr5eZfKykv8BXC",
        "ticket_info": {
          "price": "$264",
          "extracted_price": 264,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Ftems-born-in-the-wild-tour-new-york-new-york-09-05-2024%2Fevent%2F3C0060A7C4840ABA&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Jon Batiste",
        "date": {
          "start_date": "Fri, Sep 6",
          "start_time": "8:00 PM",
          "when": "Fri, Sep 6 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSDYl8dng-HZK5tM6F4U_czlkBKUmGduqjrXex17iZibCFBump",
        "ticket_info": {
          "price": "$52",
          "extracted_price": 52,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjon-batiste-at-radio-city-new-york-new-york-09-06-2024%2Fevent%2F3C006072EE8D0DC7&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Jon Batiste",
        "date": {
          "start_date": "Sat, Sep 7",
          "start_time": "8:00 PM",
          "when": "Sat, Sep 7 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSDYl8dng-HZK5tM6F4U_czlkBKUmGduqjrXex17iZibCFBump",
        "ticket_info": {
          "price": "$67",
          "extracted_price": 67,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Fjon-batiste-at-radio-city-new-york-new-york-09-07-2024%2Fevent%2F3C006072EE9A0DCA&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      {
        "title": "Rainbow Kitten Surprise: Love Hate Music Box Tour",
        "date": {
          "start_date": "Thu, Sep 12",
          "start_time": "8:00 PM",
          "when": "Thu, Sep 12 · 8:00 PM"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcScgZ9OW9HJwEkIdix4TWDHQ31cSpHzh28c_Rs8GptktyK8giRp",
        "ticket_info": {
          "price": "$62",
          "extracted_price": 62,
          "link": "https://ticketmaster.evyy.net/c/5128861/271177/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Frainbow-kitten-surprise-love-hate-music-new-york-new-york-09-12-2024%2Fevent%2F3C0060BCE4000F06&source=ev",
          "source": "Ticketmaster",
          "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.ticketmaster.com/&client=TTD_EVENTS&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1"
        }
      },
      ...
    ],
    ...
  },
  ...
}
Example of questions_and_answers
These results usually contain one highlighted question and answer pair.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x3e5f6cb0b2a778c9:0xeea9e351c55ed53a!8m2!3d25.06475!4d55.145912

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x3e5f6cb0b2a778c9:0xeea9e351c55ed53a!8m2!3d25.06475!4d55.145912",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "questions_and_answers": [
      {
        "question": {
          "user": {
            "name": "Ben Vaux",
            "link": "https://www.google.com/maps/contrib/111670536407267120973",
            "local_guide_level": 4,
            "thumbnail": "https://lh5.ggpht.com/-hp51y7rptk0/AAAAAAAAAAI/AAAAAAAAAAA/c5tUu0ALLp0/c0x00000000-cc-rp-mo-ba2/photo.jpg"
          },
          "text": "Why don’t you offer local water to drink?",
          "date": "5 years ago",
          "language": "en"
        },
        "answer": {
          "user": {
            "name": "Customer Care",
            "link": "https://www.google.com/maps/contrib/100905753574939093964",
            "local_guide_level": 0,
            "thumbnail": "https://lh6.ggpht.com/-paOHmoSNHXs/AAAAAAAAAAI/AAAAAAAAAAA/lzh8Yud3VO4/c0x00000000-cc-rp-mo/photo.jpg"
          },
          "text": "Hello Ben Vaux, Greetings from The Hamptons Cafe! Unfortunately currently we don't serve local water as per our menu, but we serve aqua panna waters.",
          "date": "3 months ago",
          "language": "en"
        },
        "total_answers": 2
      }
    ],
    ...
  },
  ...
}
Example of at_this_place
These results can appear if a building contains more than one business.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!4m5!3m4!1s0x8644b5a73c20f903%3A0xaa945f555da7262a!8m2!3d30.2689471!4d-97.7403971

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!4m5!3m4!1s0x8644b5a73c20f903%3A0xaa945f555da7262a!8m2!3d30.2689471!4d-97.7403971",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "at_this_place": {
      "type": [
        {
          "title": "Food & Drink",
          "places": 4
        },
        {
          "title": "Shopping",
          "places": 3
        },
        {
          "title": "Recreations",
          "places": 2
        },
        ...
      ],
      "places": [
        {
          "position": 1,
          "title": "Capital Factory",
          "data_id": "0x8644b5a741a48747:0x3c7ccf742ba7769d",
          "data_cid": "4358586637243348637",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x8644b5a741a48747%3A0x3c7ccf742ba7769d&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x8644b5a741a48747%3A0x3c7ccf742ba7769d&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.268888899999997,
            "longitude": -97.7405556
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x8644b5a741a48747%3A0x3c7ccf742ba7769d%218m2%213d30.268888899999997%214d-97.7405556&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 281,
          "reviews": 4.6,
          "type": "Coworking space",
          "type_id": "coworking_space",
          "address": "701 Brazos St, Austin, TX 78701",
          "location": "Floor 1",
          "open_state": "Closed ⋅ Opens 9AM",
          "hours": [
            {
              "friday": "9AM–5PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipMcSI2ZryIVPgkQ0Ha5V9-KisMe8DEs7HDaZ-ke=w86-h86-n-k-no"
        },
        {
          "position": 2,
          "title": "The Car Savior - Garage & Mobile Mechanic",
          "data_id": "0x8644cad7cc002d6b:0x70774b59bf5c8d5e",
          "data_cid": "8104028903311183198",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.2688755,
            "longitude": -97.7405641
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x8644cad7cc002d6b%3A0x70774b59bf5c8d5e%218m2%213d30.2688755%214d-97.7405641&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 78,
          "reviews": 4.8,
          "type": "Auto repair shop",
          "type_id": "auto_repair_shop",
          "address": "701 Brazos St #1600, Austin, TX 78701",
          "open_state": "Closed ⋅ Opens 8AM",
          "hours": [
            {
              "friday": "8AM–6PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNdX-DqnQAYl7f8ep6w2TT3vcJdHMZukpWXioDA=w86-h86-n-k-no"
        },
        {
          "position": 3,
          "title": "Let's Eat, Grandma",
          "data_id": "0x865b34be93908cdd:0x8974a80af9806eaf",
          "data_cid": "9904726245583646383",
          "reviews_link": "https://serpapi.com/search.json?data_id=0x865b34be93908cdd%3A0x8974a80af9806eaf&engine=google_maps_reviews&hl=en",
          "photos_link": "https://serpapi.com/search.json?data_id=0x865b34be93908cdd%3A0x8974a80af9806eaf&engine=google_maps_photos&hl=en",
          "gps_coordinates": {
            "latitude": 30.2688755,
            "longitude": -97.7405641
          },
          "place_id_search": "https://serpapi.com/search.json?data=%214m5%213m4%211s0x865b34be93908cdd%3A0x8974a80af9806eaf%218m2%213d30.2688755%214d-97.7405641&engine=google_maps&google_domain=google.com&hl=en&type=place",
          "rating": 78,
          "reviews": 4.9,
          "type": "Resume service",
          "type_id": "resume_service",
          "address": "701 Brazos St STE 500, Austin, TX 78701",
          "location": "Floors 1 and 1",
          "open_state": "Closed ⋅ Opens 9AM",
          "hours": [
            {
              "friday": "9AM–5:30PM"
            },
            ...
          ],
          "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNKq4eRGcCWcSR0vdYot5XV8PASXpf4OSA9BDCf=w86-h86-n-k-no"
        },
        ...
      ]
    },
    ...
  },
  ...
}
Example of admission
These results usually appear for attractions and museums.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "admission": [
      {
        "title": "Eiffel Tower",
        "icon": "https://www.gstatic.com/ads-travel/ttd/official_admission_32x32.png",
        "options": [
          {
            "title": "Second floor - Stair access",
            "link": "https://www.toureiffel.paris/en/rates-offers/ticket-second-floor-stairs?utm_source=magpietravelgttd",
            "price": "$11.43",
            "extracted_price": 11.43,
            "official_site": true,
            "extensions": [
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      {
        "title": "Trip.com",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://us.trip.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options": [
          {
            "title": "Early Bird Ticket: 20:00-23:00 (Admission only valid within the timeslot assigne",
            "link": "https://us.trip.com/travel-guide/attraction/paris/eiffel-tower-78772/?aid=1076145&sid=4330723&s-productIdTop=48061166&source=bm&currency=USD",
            "price": "$17.41",
            "extracted_price": 17.41,
            "extensions": [
              "Mobile Ticket"
            ]
          },
          ...
        ]
      },
      {
        "title": "Viator",
        "icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.viator.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options": [
          {
            "title": "Entrance to 2nd floor via Foot",
            "link": "https://www.viator.com/en-US/tours/Paris/Eiffel-Tower-Paris-entry-ticket/d479-371158P2?googlettd=true&src=papi",
            "price": "$23.50",
            "extracted_price": 23.5,
            "extensions": [
              "Instant confirmation"
            ]
          },
          ...
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of experiences
These results usually appear for attractions and museums.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "experiences": [
      {
        "title": "Paris Eiffel Tower Guided Climb Tour by Stairs",
        "link": "https://us.trip.com/things-to-do/detail/16124226?language=EN&locale=en_us&allianceid=1076145&sid=4330723&source=bm&currency=USD",
        "price": "$38.63",
        "extracted_price": 38.63,
        "rating": 5,
        "reviews": 47,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe4jydWLqg0B5D2-5E2uhe3fddxRqNjyEA0szDjHfUooCmtQRR",
        "serpapi_thumbnail": "https://serpapi.com/images/url/1UgPPXicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw5JNcmqTAn3KUw3cDJ1MdI1dTUqzUg1TktJqQgq9MuqdHU0KK5yyfJIC83Pd84tCQwKAgAsKSXr",
        "source": "Trip.com",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://us.trip.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "2h"
      },
      {
        "title": "Eiffel Tower: Reserved Entrance & Guided Tour with Optional Summit",
        "link": "https://www.tiqets.com/en-US/paris-attractions-c66746/tickets-for-eiffel-tower-guided-tour-by-lift-with-summit-option-p997409/?tq_source=ttd_product_feed&utm_source=e",
        "price": "$43.69",
        "extracted_price": 43.69,
        "rating": 4.5,
        "reviews": 30,
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTAIxThM74Lj_pMtOcI7iWiPT64GQGWSJcc_F7AxZiFFQI0eLsp",
        "serpapi_thumbnail": "https://serpapi.com/images/url/ZJeBqXicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnqJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw5x9KwIyfA1N_HJii_wLfFP9jTPDM8MCDEzcQ90Dw_2Sk6OdzN3rIjKdHML9DRI9SkuAAAmLiVB",
        "source": "Tiqets",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.tiqets.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "1h"
      },
      {
        "title": "Eiffel Tower: Skip The Line to the 2nd Floor + Summit Access (If Selected)",
        "link": "https://www.tiqets.com/en-US/paris-attractions-c66746/tickets-for-eiffel-tower-skip-the-ticket-line-2nd-floor-and-summit-option-p997343/?tq_source=ttd_product_feed&utm_source=e",
        "price": "$54.88",
        "extracted_price": 54.88,
        "rating": 4.6,
        "reviews": 173,
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIPn6b_vx08MLfI8ATTNzWP3ArC6-QyLegtNLFDIff6LG5K4Lz",
        "serpapi_thumbnail": "https://serpapi.com/images/url/rwjr6Xicu5mRUVJSUGylr5-al1xUWVCSmqJbkpRnqJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70DMgzS4ovqzCw8PVJ87RwDAnxqwoPMHYscjbTDaz0SU0v8fNxc_FMSzPzcTf1NvGpAgAfhSTI",
        "source": "Tiqets",
        "icon": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.tiqets.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "duration": "1h 30m"
      },
      ...
    ],
    ...
  },
  ...
}
Results for: Austin
These type of results are for cities, provinces and countries. We are able to extract, among other data, weather, hotels, vacation_rentals, and neighborhoods.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Austin",
    ...
    "weather": {
      "conditions": "Clear",
      "conditions_thumbnail": "https://ssl.gstatic.com/onebox/weather/32/sunny.png",
      "celsius": "4°C",
      "fahrenheit": "39°F"
    },
    "hotels": [
      {
        "position": 1,
        "title": "InTown Suites Extended Stay Austin TX – Research Blvd",
        "data_id": "0x8644cd131b8d09c1:0x6e30e73185636dd",
        ...
        "rating": 3.1,
        "reviews": 545,
        "type": "2-star hotel",
        "price": "$50",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    "vacation_rentals": [
      {
        "position": 1,
        "title": "HGTV Featured Tiny Home w Hot Tub Near East 6th St",
        "data_id": "0x0:0xac0984808e4cd9b2",
        ...
        "property_type": "House",
        "capacity": "Sleeps 4",
        "price": "$101",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh5.googleusercontent.com/proxy/..."
      },
      ...
    ],
    "neighborhoods": [
      {
        "position": 1,
        "title": "Downtown Austin",
        "data_id": "0x8644b50a22f2576f:0xfded6e1aca5cba6",
        ...
        "description": "Texas State Capitol & bustling nightlife",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of hotels
When searching for a city or region, hotels can appear in the place results. Each hotel includes rating, reviews, type (star classification), price, check_in_date, gps_coordinates, and links to reviews and photos.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "hotels": [
      {
        "position": 1,
        "title": "InTown Suites Extended Stay Austin TX – Research Blvd",
        "data_id": "0x8644cd131b8d09c1:0x6e30e73185636dd",
        "data_cid": "495683985933943517",
        "place_id": "ChIJwQmNGxPNRIYR3TZWGHMO4wY",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644cd131b8d09c1:0x6e30e73185636dd",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644cd131b8d09c1:0x6e30e73185636dd",
        "gps_coordinates": {
          "latitude": 30.438837,
          "longitude": -97.77581
        },
        "place_id_search": "https://serpapi.com/search.json?data=...&engine=google_maps&type=place",
        "rating": 3.1,
        "reviews": 545,
        "type": "2-star hotel",
        "price": "$50",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "Holiday Inn Express & Suites Austin NW - Four Points by IHG",
        "data_id": "0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "data_cid": "3296625529810634250",
        "place_id": "ChIJb3oIl7YzW4YRCqboDAtGsi0",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x865b33b697087a6f:0x2db2460b0ce8a60a",
        "gps_coordinates": {
          "latitude": 30.421156,
          "longitude": -97.847103
        },
        "place_id_search": "https://serpapi.com/search.json?data=...&engine=google_maps&type=place",
        "rating": 4.3,
        "reviews": 694,
        "type": "3-star hotel",
        "price": "$66",
        "check_in_date": "2026-03-30",
        "thumbnail": "https://lh3.googleusercontent.com/p/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of vacation_rentals
When searching for a city or region, vacation_rentals can appear alongside hotels. Each rental includes property_type (e.g. "House", "Apartment"), capacity (e.g. "Sleeps 4"), price, check_in_date, and gps_coordinates.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "vacation_rentals": [
      {
        "position": 1,
        "title": "HGTV Featured Tiny Home w Hot Tub Near East 6th St",
        "data_id": "0x0:0xac0984808e4cd9b2",
        "data_cid": "12396527001155799474",
        "place_id": "CgkRstlMjoCECaw",
        "gps_coordinates": {
          "latitude": 30.264395,
          "longitude": -97.719292
        },
        "property_type": "House",
        "capacity": "Sleeps 4",
        "price": "$101",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh5.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "Elegant Escape | Gourmet Kitchen + Outdoor Living",
        "data_id": "0x0:0x80a508e0b1cac36b",
        "data_cid": "9260427849499591531",
        "place_id": "CgkRa8PKseAIpYA",
        "gps_coordinates": {
          "latitude": 30.318434,
          "longitude": -97.72496
        },
        "property_type": "House",
        "capacity": "Sleeps 8",
        "price": "$164",
        "check_in_date": "2026-04-20",
        "thumbnail": "https://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Example of neighborhoods
When searching for a city or region, neighborhoods can appear in the place results. Each neighborhood includes a description and thumbnail, along with links to reviews and photos.

GET


https://serpapi.com/search.json?engine=google_maps&q=austin+texas&ll=@40.7455096,-74.0083012,14z&type=search

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  q: "austin texas",
  ll: "@40.7455096,-74.0083012,14z",
  type: "search",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "neighborhoods": [
      {
        "position": 1,
        "title": "Downtown Austin",
        "data_id": "0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "data_cid": "1144268399771573158",
        "place_id": "ChIJb1fyIgq1RIYRpsulrOHW3g8",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b50a22f2576f:0xfded6e1aca5cba6",
        "description": "Texas State Capitol & bustling nightlife",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      {
        "position": 2,
        "title": "South Congress",
        "data_id": "0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "data_cid": "8926785009455398504",
        "place_id": "ChIJhzA936a0RIYRaMyqhF-b3Hs",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b4a6df3d3087:0x7bdc9b5f84aacc68",
        "description": "Continental Club, cool shops & eateries",
        "thumbnail": "http://lh6.googleusercontent.com/proxy/..."
      },
      {
        "position": 3,
        "title": "Zilker",
        "data_id": "0x8644b5213187c143:0x58356ef955bfbf77",
        "data_cid": "6355073261411147639",
        "place_id": "ChIJQ8GHMSG1RIYRd7-_VfluNVg",
        "reviews_link": "https://serpapi.com/search.json?engine=google_maps_reviews&hl=en&data_id=0x8644b5213187c143:0x58356ef955bfbf77",
        "photos_link": "https://serpapi.com/search.json?engine=google_maps_photos&hl=en&data_id=0x8644b5213187c143:0x58356ef955bfbf77",
        "description": "Trendy eateries & bars near Zilker Park",
        "thumbnail": "http://lh4.googleusercontent.com/proxy/..."
      },
      ...
    ],
    ...
  },
  ...
}
Results for: Maid2Clean
These results contain booking_link.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&data=!3m1!4b1!4m6!3m5!1s0x487760d5a813a0ed:0xa081a873e2f526a7!8m2!3d52.6360771!4d-1.1311002!16s%2fg%2f11b6j113kn

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  data: "!3m1!4b1!4m6!3m5!1s0x487760d5a813a0ed:0xa081a873e2f526a7!8m2!3d52.6360771!4d-1.1311002!16s%2fg%2f11b6j113kn",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "booking_link": "https://www.maid2clean.co.uk/book-a-cleaner/?id=61&utm_source=gmb&utm_medium=organic",
    "website": "https://www.maid2clean.co.uk/domestic-cleaning/leicester/?utm_source=gmb&utm_medium=organic",
    "phone": "+44 116 356 0126",
    "open_state": "Closes soon ⋅ 8:30 PM ⋅ Opens 9 AM Wed",
    ...
  },
  ...
}
Example of web_results_link
Web Results typically appear at the end of the listing, displaying relevant web pages for the selected place. However, a new request must be made to retrieve the data; thus, we extract the link to retrieve the data as web_results_link. Simultaneously, we also provide serpapi_web_results_link, which returns the parsed results. You can view an example response on Google Organic Results.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJQTNrM69ZwokR3ggxzgeelqQ

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJQTNrM69ZwokR3ggxzgeelqQ",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "web_results_link": "https://www.google.com/search?q=local+guide+program&ibp=gwp;0,26,OiIKICIcR3JlZ29yeXMgQ29mZmVlIE5ldyBZb3JrLCBOWSgC&pcl=lp",
    "serpapi_web_results_link": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&ibp=gwp%3B0%2C26%2COiIKICIcR3JlZ29yeXMgQ29mZmVlIE5ldyBZb3JrLCBOWSgC&q=local+guide+program"
  },
  ...
}
Example with place_id: ChIJLU7jZClu5kcR4PcOOO6p3I0 and optional gl: br parameters
By using gl parameter, you can further improve locale results (e.g. returning the correct currency for a set location).

GET


https://serpapi.com/search.json?engine=google_maps&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0&gl=br

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  gl: "br",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search

JSON Example

{
  ...
  "place_results": {
    ...
    "admission":[
      {
        "title":"Eiffel Tower",
        "icon":"https://www.gstatic.com/ads-travel/ttd/official_admission_32x32.png",
        "options":[
          {
            "title":"Second floor - Stair access",
            "link":"https://www.toureiffel.paris/en/rates-offers/ticket-second-floor-stairs?utm_source=magpietravelgttd",
            "price":"R$87.07",
            "extracted_price":87.07,
            "official_site":true,
            "extensions":[
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      {
        "title":"Myticketsworld",
        "icon":"https://encrypted-tbn2.gstatic.com/faviconV2?url=https://myticketsworld.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "options":[
          {
            "title":"The Eiffel Tower’s: Ticket with access to 2nd floor via stairs",
            "link":"https://myticketsworld.com/products/the-eiffel-tower-s-ticket-with-access-to-2nd-floor-via-stairs",
            "price":"R$80.94",
            "extracted_price":80.94,
            "extensions":[
              "Instant confirmation",
              "Mobile Ticket"
            ]
          }
        ]
      },
      ...
    ],
    ...
  },
  ...
Example of booking_options
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJDQR-DiEFdkgRArsxMCL5YCc

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJDQR-DiEFdkgRArsxMCL5YCc",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Big Bus Tours London",
    "place_id": "ChIJDQR-DiEFdkgRArsxMCL5YCc",
    ...
    "booking_options": [
      {
        "title": "Big Bus Tours London",
        "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.bigbustours.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11vblpvzn3",
            "title": "Big Bus London Evening Tour",
            "price": "$47",
            "duration": "2h",
            "rating": 4,
            "reviews": 4132,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.bigbustours.com/en/london/london-evening-tour-ticket?utm_source=GTTD-London&utm_medium=GTTD&utm_campaign=GTTD-London-buy-tickets",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ6a1FDn_saCYu_NCRDPdtHmNB291W_WQceyre_4fXz4rnqaiwyqMRYYDDujsNeZYI",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTy0oSZ0KvjweEYbW6TnpU8cSedqG2JIKOSanRYzVxZg4odyXZpnbQd2Otp8r7gvzE",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT2BPeS4H8pFk6_2jCOm52Ly4HVXSlgT7GUBuul7IgixxNjhuYrTszKZ0udVPoxFT0",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHxJZWgbGdJCEP2I5eMZs-Ob4OCG-YjI3ikgIHJQGA8wlCTk8p6WNZoYuq40or0w"
            ]
          },
          {
            "kgmid": "/g/11vdx9mbg3",
            "title": "Big Bus London Discover",
            "price": "$59",
            "duration": "1d",
            "rating": 4,
            "reviews": 4132,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.bigbustours.com/en/london/london-discover-ticket?utm_source=GTTD-London&utm_medium=GTTD&utm_campaign=GTTD-London-buy-tickets",
            "thumbnails": [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLCs5zzkCnd6Pu8T3NvEgXJFaHLw9f--XMMloExCSJz6_8ApnvtromsTjoc5PN4Y",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRr4oeojjwwNJlIEa70VkQBMdjh4JJJijOTThmSOqv6lmA08b7GuxXRO2CKfd2sgaM",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQKoVNgwb1q0RQbWNw3tiSdgBJanPF9MFLnsefjDICRnDxC2vhzHNsCXTU0o-VQtuw",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKxrcWkG30xMbMJxiXQGaDVWoBPlGnwfEamyKpUr5E7IqOqgsGxZNGNytfJ2l_-8s"
            ]
          },
          ...
        ]
      },
      {
        "title": "Civitatis",
        "source_icon": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.civitatis.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11vjhc_79t",
            "title": "Madrid Navibus Tour",
            "price": "$11",
            "rating": 3.3,
            "reviews": 197,
            "link": "https://www.civitatis.com/redirect-ttd/174702/o?lang=en-US&currency=USD",
            "thumbnails": [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1iq4wAjtqR_3mfvsmPBWqFjwUGHuK3MbMrPiVnleyGZ0hr362Nu-PrSj7xOnfNZM",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFV0lQQDfwxayxd6Fu7FsTjYcAMX8soNHrf2fDmW9mQgmNPreLZzOvy5bfSFDWPiA",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlrZdillZ7gnpSDhlDL3i92LupC3K4eaj5DAartg4tsM61bG_4xK9_FQm897DI794",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEWI5INXzwfkEoiyXfVmFxS0XldbmeZCtz2QkgB9hAeFv8dod-Z-wj6ycrIhtB4A"
            ]
          },
          {
            "kgmid": "/g/11w3m3wn6t",
            "title": "Big Bus: Rome Sightseeing Bus",
            "price": "$20",
            "rating": 4.0,
            "reviews": 91,
            "link": "https://www.civitatis.com/redirect-ttd/180212/o?lang=en-US&currency=USD",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTv6a031OqTXFa9NAOqnc_H6DKfzTCZtmut-YlbfJjocpBV1R4fMlwQsVlYFHclb1I",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSVPy8hik4y0zdJZO_eLi5FT_b-cnbHxDQoe1CtmzNS5x5_Bo9si22x2crkV6rin_I",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTbglhthLuX3B2pgckha3pA3Tc_Vr8bgaC0cfKJUVQNhYFXJiYSzNBkUcF7XQeiBM",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSIKPWsnwUd3rELZU6WHiuW4SzRflrqBp3_En4GgDKgslgG2TVJQ3o1q5A3MeWoODg"
            ]
          },
          ...
        ]
      },
      ...
      {
        "title": "Viator",
        "source_icon": "https://encrypted-tbn3.gstatic.com/faviconV2?url=https://www.viator.com/&client=DESTINATION_EXPLORE&type=FAVICON&size=32&fallback_opts=TYPE,SIZE,URL&nfrp=1",
        "items": [
          {
            "kgmid": "/g/11q9tyzcvt",
            "title": "Big Bus London Open-Top Evening Tour",
            "price": "$47",
            "duration": "2h",
            "rating": 3.9,
            "reviews": 141,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.viator.com/en-US/London/d737-ttd/p-6506P2?googlettd=true&src=papi&campaign=o&surface=maps&funnel=nav",
            "thumbnails": [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS88W75H3EgH8iYuwHjp80ve1Fhh_davgcurnkxsUuySnBmnM0lHIYhwN4shWvo5z0",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSacWh4msJThCdYowwAdVJnsExcdsXwFhoSoEpel4JFy75yw2zNOYzaBwnMaiW3uRo",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZ1gbO7YyK115M8o6ZV0sSbTRW4iSzp8gcFJel88TZ-5ALLa4hrf-iaUePc4Z4Pdg",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRamSpS07guVKHDzxdRaymlUAg2gln-B_m1PUmCdXDnYhMtidNqxw9uzkHEQONAURM"
            ]
          },
          {
            "kgmid": "/g/11syfqkh2r",
            "title": "Big Bus London Hop-On Hop-Off Tour & River Cruise",
            "price": "$51",
            "duration": "3h 30m",
            "rating": 3.8,
            "reviews": 9633,
            "confirmation": true,
            "mobile_ticket": true,
            "link": "https://www.viator.com/en-US/London/d737-ttd/p-6506LONHOHO?googlettd=true&src=papi&campaign=o&surface=maps&funnel=nav",
            "thumbnails": [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_clWIIcXOSfylXJ6193DMnbDfP9lR-nulel0N3G7BJEQkNuVUmU7zwzquqXmwom4",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShmhVzYFOxuaajEe1oI2zKSJmI_-HJE6-DusN9DvNLb7KsRldR5DWd8LIPwTNUV3s",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMEVsGOoqOhunHfl8vKBDW8oczOkh4CdhFTfbLJoTl3Kx6FcpSxNV_98RhibPN9gQ",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQLPqjkF0qAkp8H0poLACPhyd03Pjvw35p_CgWRP2pJdBzaTbEyBBMXnco295uONlo"
            ]
          },
          ...
        ]
      },
      ...
    ],
    ...
  },
  ...
}
Example of price_details
price_details consist of different price groups and their distribution percentages.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJ9Sto4ahZwokRXpWiQYiOOOo

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJ9Sto4ahZwokRXpWiQYiOOOo",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "price": "$10–20",
    "price_details": {
      "distribution": [
        {
          "price": "$1–10",
          "percentage": 14.473684210526317,
          "reported_count": 33
        },
        {
          "price": "$10–20",
          "percentage": 66.22807017543859,
          "reported_count": 151
        },
        {
          "price": "$20–30",
          "percentage": 15.350877192982457,
          "reported_count": 35
        }
      ],
      "total_reported": 228
    },
    ...
  },
  ...
}
Example of images.last_updated
Some images may include information about when they were updated.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJv-CygqQsDogRfgd52uaGbCI

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJv-CygqQsDogRfgd52uaGbCI",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "images": [
      {
        "title": "All",
        "thumbnail": "https://lh3.googleusercontent.com/p/AF1QipMiY1bRS7qXbaCvxg2ehE4tC3rccMVaJUebmDdh=w390-h298-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/Djdbt3icuxmfUVJSUGylr5-TYayXnp-fnpNaWpxalJyfV5KaV6KXnJ-rX6Dv6GYYmFngmxlpmBQUbF4YkZToXFaRbpSa4WpS4mxclJzsG5boFZqalOuSkmFbbmxpoJthZGmhm62blw8A06sh2g"
      },
      {
        "title": "Latest",
        "last_updated": "3 days ago",
        "thumbnail": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwU0Zo3c984vZJfKV14SOSXQTFOM8YXXjt3FNGeDOLaIpcbZH78PrRZycg39cO1lHQt2cxZBIX75L54KCn8tC7lgT7OMo4ZdkgC3aVJUPo59JBWY6cW9I6BlNqpFD7lFiEJ_Cx6kVwJUko=w224-h398-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/vNYuf3icBcHtVoIwGADgK5ooG2zrnH4EhjI_piGI-9OxNxrGYuRW2EV2Ad1Nz_P323o_uLsgMC2eaGu1ab5ccwXb-6b3E7AfgR4cAodc8LCYXkwxllNlMXBGvpV4W1UzUsii3h8yuWGnun73ONsumrlcn_MBXtSSst31Sf2AxhzkzCz3PoSbSvKaRuuIrNKe-ZQafaByY4l67XSKz5UodzbiIjmeYjjyPE7M9nPI5tRkl0fxnN7irhpF2dn7MQwJajFnqEO9_Qcgy0Sx"
      },
      {
        "title": "Videos",
        "thumbnail": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyXbRwLCS1yeFSUozV7xxdYI11ZkeB5vZ3p3rzQiCZNrbkY1AplzIg0M4VCw2blGT4jzSorXBYemTKcefxd2vyqeR-lMHf6d7P3MsGIAUh8qMeokgdElMn_VgcRdkb-fbNeB3U=w529-h298-k-no",
        "serpapi_thumbnail": "https://serpapi.com/images/url/pc4jdnicBcFbjoIwFADQFVWE6vhI_AAywxCtURAi_Ji0vRRtpUhRHvtzEe7Gcz7vsm1rs7YsVeKJ0FooeBpomK5aqNoJ03dL1AYxg4zlBtOrioczjbqdH9sD_MWJHtNF3_MstO1cgjd_5bjGzXi8-vm-oTKz3VqNoZiSWep3DlXBaXYbY92cvQzupy2DoufOa3hAhBT5L3744oCJCUI3KZcPAloK_qtIdUkFi7ikqKB78HCy6ebOCpXOaokkqvQXPSZFog"
      },
      ...
    ],
    ...
  },
  ...
}
Example of detailed description
Some places may have detailed description with the additional link and source fields.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJiQHsW0m3j4ARm69rRkrUF3w

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJiQHsW0m3j4ARm69rRkrUF3w",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    ...
    "description": {
      "snippet": "Mountain View is a city in Santa Clara County, California, United States, part of the San Francisco Bay Area. Named for its views of the Santa Cruz Mountains, the population was 82,376 at the 2020 census.",
      "link": "https://en.wikipedia.org/wiki/Mountain_View,_California",
      "source": "Wikipedia"
    },
    ...
  },
  ...
}
Example of opens_date
GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJqQNCxg0DdkgRlMjaw8YYzvE

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJqQNCxg0DdkgRlMjaw8YYzvE",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

{
  ...
  "place_results": {
    "title": "Connie's Pizza",
    "opens_date": "Opens 26 Jan",
    "place_id": "ChIJqQNCxg0DdkgRlMjaw8YYzvE",
    ...
  },
  ...
}
Example of unclaimed_listing
Some business places are not yet claimed. These places will have the field "unclaimed_listing" set to true.

GET


https://serpapi.com/search.json?engine=google_maps&type=place&place_id=ChIJzVcorM1ZwokRZZIrWe_tQ-8

Code to integrate


Ruby

require "serpapi" 

client = SerpApi::Client.new(
  engine: "google_maps",
  type: "place",
  place_id: "ChIJzVcorM1ZwokRZZIrWe_tQ-8",
  api_key: "e259562d1388fa6f830648c3374670c551a0e4b051a2b4771b28716cb156d767"
)

results = client.search
place_results = results[:place_results]

JSON Example

  {
    ...
    "place_results": {
      ...
      "title": "BBQ Stand",
      "place_id": "ChIJzVcorM1ZwokRZZIrWe_tQ-8",
      ...
      "unclaimed_listing": true,
      ...
    },
    ...
  }
Api Status ‧GitHub ‧Legal ‧Security ‧Libraries ‧Release Notes ‧Public Roadmap ‧Support
© 2016-2026 SerpApi, LLC.             