import { IObject } from "../modules/places/types";
import { IVenuePhotos } from "../modules/venue/types";
interface IVenuePhotosData {
  [key: string]: IVenuePhotos;
}
const locations: IObject = {
  meta: {
    code: 200,
    requestId: "5dc2aa80787dba003894f155"
  },
  response: {
    suggestedFilters: {
      header: "Tap to show:",
      filters: [
        {
          name: "Open now",
          key: "openNow"
        }
      ]
    },
    headerLocation: "London",
    headerFullLocation: "London",
    headerLocationGranularity: "city",
    query: "coffee",
    totalResults: 29,
    suggestedBounds: {
      ne: {
        lat: 51.55284104544104,
        lng: 0.2006714879431466
      },
      sw: {
        lat: 51.46195895455895,
        lng: 0.054928512056853396
      }
    },
    groups: [
      {
        type: "Recommended Places",
        name: "recommended",
        items: [
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: "This spot is popular",
                  type: "general",
                  reasonName: "globalInteractionReason"
                }
              ]
            },
            venue: {
              id: "557c3971498ec5857dd9bdf4",
              name: "The Plumstead Pantry",
              contact: {},
              location: {
                address: "16 Warwick Terrace",
                lat: 51.481712277210015,
                lng: 0.08370658454028887,
                labeledLatLngs: [
                  {
                    label: "display",
                    lat: 51.481712277210015,
                    lng: 0.08370658454028887
                  }
                ],
                distance: 4185,
                cc: "GB",
                neighborhood: "Plumstead",
                city: "London",
                state: "Greater London",
                country: "United Kingdom",
                formattedAddress: [
                  "16 Warwick Terrace",
                  "London",
                  "Greater London",
                  "United Kingdom"
                ]
              },
              categories: [
                {
                  id: "4bf58dd8d48988d16d941735",
                  name: "Café",
                  pluralName: "Cafés",
                  shortName: "Café",
                  icon: {
                    prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_",
                    suffix: ".png"
                  },
                  primary: true
                }
              ],
              verified: false,
              stats: {
                tipCount: 0,
                usersCount: 0,
                checkinsCount: 0,
                visitsCount: 0
              },
              beenHere: {
                count: 0,
                lastCheckinExpiredAt: 0,
                marked: false,
                unconfirmedCount: 0
              },
              photos: {
                count: 0,
                groups: []
              },
              hereNow: {
                count: 0,
                summary: "Nobody here",
                groups: []
              }
            },
            referralId: "e-3-557c3971498ec5857dd9bdf4-0"
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: "This spot is popular",
                  type: "general",
                  reasonName: "globalInteractionReason"
                }
              ]
            },
            venue: {
              id: "5a82a793c97f285a363851db",
              name: "Boulangerie Jade",
              contact: {},
              location: {
                address: "9 Major Draper St",
                lat: 51.492575314136594,
                lng: 0.07055944193435805,
                labeledLatLngs: [
                  {
                    label: "display",
                    lat: 51.492575314136594,
                    lng: 0.07055944193435805
                  }
                ],
                distance: 4296,
                postalCode: "SE18 6GD",
                cc: "GB",
                city: "Woolwich Riverside",
                state: "Greater London",
                country: "United Kingdom",
                formattedAddress: [
                  "9 Major Draper St",
                  "Woolwich Riverside",
                  "Greater London",
                  "SE18 6GD",
                  "United Kingdom"
                ]
              },
              categories: [
                {
                  id: "4bf58dd8d48988d16a941735",
                  name: "Bakery",
                  pluralName: "Bakeries",
                  shortName: "Bakery",
                  icon: {
                    prefix:
                      "https://ss3.4sqi.net/img/categories_v2/food/bakery_",
                    suffix: ".png"
                  },
                  primary: true
                }
              ],
              verified: false,
              stats: {
                tipCount: 0,
                usersCount: 0,
                checkinsCount: 0,
                visitsCount: 0
              },
              beenHere: {
                count: 0,
                lastCheckinExpiredAt: 0,
                marked: false,
                unconfirmedCount: 0
              },
              photos: {
                count: 0,
                groups: []
              },
              hereNow: {
                count: 0,
                summary: "Nobody here",
                groups: []
              }
            },
            referralId: "e-3-5a82a793c97f285a363851db-1"
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: "This spot is popular",
                  type: "general",
                  reasonName: "globalInteractionReason"
                }
              ]
            },
            venue: {
              id: "4d6e665a30d5b1f735a7c642",
              name: "Costa Coffee",
              contact: {},
              location: {
                address: "Gallions Reach",
                lat: 51.51666109789084,
                lng: 0.08203952345187338,
                labeledLatLngs: [
                  {
                    label: "display",
                    lat: 51.51666109789084,
                    lng: 0.08203952345187338
                  }
                ],
                distance: 3333,
                postalCode: "E6",
                cc: "GB",
                city: "Beckton",
                state: "Greater London",
                country: "United Kingdom",
                formattedAddress: [
                  "Gallions Reach",
                  "Beckton",
                  "Greater London",
                  "E6",
                  "United Kingdom"
                ]
              },
              categories: [
                {
                  id: "4bf58dd8d48988d1e0931735",
                  name: "Coffee Shop",
                  pluralName: "Coffee Shops",
                  shortName: "Coffee Shop",
                  icon: {
                    prefix:
                      "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
                    suffix: ".png"
                  },
                  primary: true
                }
              ],
              verified: false,
              stats: {
                tipCount: 0,
                usersCount: 0,
                checkinsCount: 0,
                visitsCount: 0
              },
              beenHere: {
                count: 0,
                lastCheckinExpiredAt: 0,
                marked: false,
                unconfirmedCount: 0
              },
              photos: {
                count: 0,
                groups: []
              },
              hereNow: {
                count: 0,
                summary: "Nobody here",
                groups: []
              }
            },
            referralId: "e-3-4d6e665a30d5b1f735a7c642-2"
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: "This spot is popular",
                  type: "general",
                  reasonName: "globalInteractionReason"
                }
              ]
            },
            venue: {
              id: "5b8acea3ea1e44002c513bea",
              name: "Starbucks",
              contact: {},
              location: {
                address: "Norman Park",
                crossStreet: "Clydesdale Way",
                lat: 51.496933,
                lng: 0.155457,
                labeledLatLngs: [
                  {
                    label: "display",
                    lat: 51.496933,
                    lng: 0.155457
                  }
                ],
                distance: 2242,
                postalCode: "DA17 6FD",
                cc: "GB",
                city: "Belvedere",
                state: "Greater London",
                country: "United Kingdom",
                formattedAddress: [
                  "Norman Park (Clydesdale Way)",
                  "Belvedere",
                  "Greater London",
                  "DA17 6FD",
                  "United Kingdom"
                ]
              },
              categories: [
                {
                  id: "4bf58dd8d48988d1e0931735",
                  name: "Coffee Shop",
                  pluralName: "Coffee Shops",
                  shortName: "Coffee Shop",
                  icon: {
                    prefix:
                      "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
                    suffix: ".png"
                  },
                  primary: true
                }
              ],
              verified: false,
              stats: {
                tipCount: 0,
                usersCount: 0,
                checkinsCount: 0,
                visitsCount: 0
              },
              beenHere: {
                count: 0,
                lastCheckinExpiredAt: 0,
                marked: false,
                unconfirmedCount: 0
              },
              photos: {
                count: 0,
                groups: []
              },
              hereNow: {
                count: 0,
                summary: "Nobody here",
                groups: []
              }
            },
            referralId: "e-3-5b8acea3ea1e44002c513bea-3"
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: "This spot is popular",
                  type: "general",
                  reasonName: "globalInteractionReason"
                }
              ]
            },
            venue: {
              id: "573dc572498ed0f35f4f4902",
              name: "Costa Coffee",
              contact: {},
              location: {
                address: "Beckton Triangle Retail Park",
                lat: 51.52247990855876,
                lng: 0.07096210918806237,
                labeledLatLngs: [
                  {
                    label: "display",
                    lat: 51.52247990855876,
                    lng: 0.07096210918806237
                  }
                ],
                distance: 4280,
                postalCode: "E6 6LH",
                cc: "GB",
                city: "London",
                state: "Greater London",
                country: "United Kingdom",
                formattedAddress: [
                  "Beckton Triangle Retail Park",
                  "London",
                  "Greater London",
                  "E6 6LH",
                  "United Kingdom"
                ]
              },
              categories: [
                {
                  id: "4bf58dd8d48988d1e0931735",
                  name: "Coffee Shop",
                  pluralName: "Coffee Shops",
                  shortName: "Coffee Shop",
                  icon: {
                    prefix:
                      "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
                    suffix: ".png"
                  },
                  primary: true
                }
              ],
              verified: false,
              stats: {
                tipCount: 0,
                usersCount: 0,
                checkinsCount: 0,
                visitsCount: 0
              },
              beenHere: {
                count: 0,
                lastCheckinExpiredAt: 0,
                marked: false,
                unconfirmedCount: 0
              },
              photos: {
                count: 0,
                groups: []
              },
              hereNow: {
                count: 0,
                summary: "Nobody here",
                groups: []
              }
            },
            referralId: "e-3-573dc572498ed0f35f4f4902-4"
          }
        ]
      }
    ]
  }
};

const photos: IVenuePhotosData = {
  "557c3971498ec5857dd9bdf4": {
    meta: {
      code: 200,
      requestId: "5dc4e79cfd16bb0039917908"
    },
    response: {
      photos: {
        count: 1,
        items: [
          {
            id: "59c65407db1d8114b5cbd253",
            createdAt: 1506169863,
            source: {
              name: "Swarm for iOS",
              url: "https://www.swarmapp.com"
            },
            prefix: "https://fastly.4sqi.net/img/general/",
            suffix: "/56942_w_ZJ6vw0Yi6FaFsC7o0hXPM-kg_vmRcaN-wf_OPg7fU.jpg",
            width: 1440,
            height: 1920,
            user: {
              id: "56942",
              firstName: "James",
              lastName: "Head",
              gender: "male",
              photo: {
                prefix: "https://fastly.4sqi.net/img/user/",
                suffix: "/56942_1255001564584.jpg"
              }
            },
            checkin: {
              id: "59c6540593bd637b669b6eba",
              createdAt: 1506169861,
              type: "checkin",
              timeZoneOffset: 60
            },
            visibility: "public"
          }
        ],
        dupesRemoved: 0
      }
    }
  },
  "4d6e665a30d5b1f735a7c642": {
    meta: {
      code: 200,
      requestId: "5dc4e97ba4b51b002c7fe6c1"
    },
    response: {
      photos: {
        count: 1,
        items: [
          {
            id: "501d138fe4b0f873f7e9f3d4",
            createdAt: 1344082831,
            source: {
              name: "Foursquare for iOS",
              url: "https://foursquare.com/download/#/iphone"
            },
            prefix: "https://fastly.4sqi.net/img/general/",
            suffix: "/ljcP9VHoVEHbRaUp5xP2lPKjAUxJ4o-XjwaJd-3qHEA.jpg",
            width: 405,
            height: 540,
            user: {
              id: "2395669",
              firstName: "Benson",
              lastName: "Hunter",
              gender: "male",
              photo: {
                prefix: "https://fastly.4sqi.net/img/user/",
                suffix: "/2395669-3JNE0PHJX0F4GPBN.jpg"
              }
            },
            checkin: {
              id: "501d137ae4b0cf97af6c2ddd",
              createdAt: 1344082810,
              type: "checkin",
              timeZoneOffset: 60
            },
            visibility: "public"
          }
        ],
        dupesRemoved: 0
      }
    }
  },
  "573dc572498ed0f35f4f4902": {
    meta: {
      code: 200,
      requestId: "5dc4e9a9fd16bb0039976557"
    },
    response: {
      photos: {
        count: 1,
        items: [
          {
            id: "5b1d098d029a55002cfe0145",
            createdAt: 1528629645,
            source: {
              name: "Swarm for iOS",
              url: "https://www.swarmapp.com"
            },
            prefix: "https://fastly.4sqi.net/img/general/",
            suffix: "/2825902_5Sul6ZGCg4z31dwvd8QcnlZ2M_4lRdHoZFbXTd1AIow.jpg",
            width: 1920,
            height: 1440,
            user: {
              id: "2825902",
              firstName: "Paul",
              lastName: "Anderson-Foster",
              gender: "male",
              photo: {
                prefix: "https://fastly.4sqi.net/img/user/",
                suffix:
                  "/2825902_pp47pE55_rRQsR7EL5Oax7O-UL3JPqdgm2lXNF9UJdLoTe8BIcnH8mi5ijpOspqBwylW2bqC8.jpg"
              }
            },
            checkin: {
              id: "5b1d0943446ea6002c2a1c46",
              createdAt: 1528629571,
              type: "checkin",
              timeZoneOffset: 60,
              with: [
                {
                  id: "210512",
                  firstName: "Mark",
                  lastName: "Anderson",
                  gender: "male",
                  photo: {
                    prefix: "https://fastly.4sqi.net/img/user/",
                    suffix:
                      "/210512_bZ0sE1sN_KprzeeHpAyCJ_Ps1HoOOfqHYZ575soHqqJ2bKQ0RJKOuy35zyDxeKP4AFNv2y7eJ.jpg"
                  }
                }
              ]
            },
            visibility: "public"
          }
        ],
        dupesRemoved: 0
      }
    }
  },
  "5b8acea3ea1e44002c513bea": {
    meta: {
      code: 200,
      requestId: "5dc4e9efcc7d41002b8d325c"
    },
    response: {
      photos: {
        count: 0,
        items: [],
        dupesRemoved: 0
      }
    }
  },
  "5a82a793c97f285a363851db": {
    meta: {
      code: 200,
      requestId: "5dc4ebc26001bc002b8bf0c4"
    },
    response: {
      photos: {
        count: 1,
        items: [
          {
            id: "5d1de5d372590d00308c3e89",
            createdAt: 1562240467,
            source: {
              name: "Swarm for iOS",
              url: "https://www.swarmapp.com"
            },
            prefix: "https://fastly.4sqi.net/img/general/",
            suffix: "/46463026_F41MqiYuaxGmN-o7TkcmLIGGo55e2uJ7_Gado6J-yxo.jpg",
            width: 1920,
            height: 1440,
            user: {
              id: "46463026",
              firstName: "Paula C.",
              gender: "female",
              photo: {
                prefix: "https://fastly.4sqi.net/img/user/",
                suffix:
                  "/46463026_fDcvYyCW_v03JpeRGJvJMh-hVXI8GixJmpGukTncPOAQZMNa8nAL7Cv0CXulkMH9XWWDXegn2.jpg"
              }
            },
            checkin: {
              id: "5d1de5d15e620c00070e29fe",
              createdAt: 1562240465,
              type: "checkin",
              timeZoneOffset: 60
            },
            visibility: "public"
          }
        ],
        dupesRemoved: 0
      }
    }
  }
};
export { photos, locations };
