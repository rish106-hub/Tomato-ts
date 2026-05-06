import { food_list } from '../assets/assets'

const restaurantCatalog = [
  {
    id: 'dum-safar',
    slug: 'dum-safar-cp',
    name: 'Dum Safar',
    area: 'Connaught Place, Delhi',
    cuisines: ['Biryani', 'Mughlai', 'Kebabs'],
    rating: 4.6,
    reviewsCount: 1842,
    eta: '28-34 mins',
    priceForTwo: 700,
    badge: 'Top biryani tonight',
    deliveryFee: 'Free above INR 499',
    openUntil: 'Open until 1:30 AM',
    description: 'A high-frequency biryani kitchen built for office lunches, family dinners and late-night rice cravings.',
    feedback: [
      { name: 'Ananya, Noida', text: 'Rice stayed fluffy and the masala hit exactly right. This is the kind of biryani repeat-order people remember.' },
      { name: 'Rajat, Patel Nagar', text: 'Good portion, proper dum aroma, no bland filler bites. Felt like an actual restaurant order, not a placeholder listing.' }
    ]
  },
  {
    id: 'thali-ghar',
    slug: 'thali-ghar-rajouri',
    name: 'Thali Ghar',
    area: 'Rajouri Garden, Delhi',
    cuisines: ['North Indian', 'Thali', 'Home-style'],
    rating: 4.5,
    reviewsCount: 1214,
    eta: '24-31 mins',
    priceForTwo: 550,
    badge: 'Comfort meal favourite',
    deliveryFee: 'Delivery from INR 39',
    openUntil: 'Open until 11:45 PM',
    description: 'Balanced plates, rich gravies and full-meal packaging for people who want a proper lunch or dinner, not snack-sized shortcuts.',
    feedback: [
      { name: 'Srishti, Janakpuri', text: 'Exactly the kind of complete meal you order when the whole house wants different textures in one tray.' },
      { name: 'Aman, Punjabi Bagh', text: 'The thali felt generous and organised. Good for office days when you want one dependable order.' }
    ]
  },
  {
    id: 'kathi-theory',
    slug: 'kathi-theory-gurgaon',
    name: 'Kathi Theory',
    area: 'Sector 29, Gurgaon',
    cuisines: ['Rolls', 'Kathi', 'Snacks'],
    rating: 4.4,
    reviewsCount: 963,
    eta: '21-28 mins',
    priceForTwo: 400,
    badge: 'Evening snack hero',
    deliveryFee: 'Delivery from INR 29',
    openUntil: 'Open until 12:30 AM',
    description: 'Fast-moving wraps, high-flavour fillings and sharp chutney combinations for NCR’s post-work hunger window.',
    feedback: [
      { name: 'Niharika, DLF Phase 3', text: 'The roll actually held together and still tasted fresh after delivery. Strong office-order option.' },
      { name: 'Vivek, Udyog Vihar', text: 'Masala level was right and the roomali stayed soft. Good repeat value for quick hunger.' }
    ]
  },
  {
    id: 'steam-room',
    slug: 'steam-room-lajpat',
    name: 'Steam Room',
    area: 'Lajpat Nagar, Delhi',
    cuisines: ['Momos', 'Tibetan', 'Street Food'],
    rating: 4.5,
    reviewsCount: 1479,
    eta: '19-27 mins',
    priceForTwo: 420,
    badge: 'Late-night momo rush',
    deliveryFee: 'Delivery from INR 35',
    openUntil: 'Open until 1:00 AM',
    description: 'Built around fiery chutneys, steamed baskets and indulgent sauce-heavy variants that convert well in the evening.',
    feedback: [
      { name: 'Ishita, South Ex', text: 'Chutney had bite, momos stayed juicy, and the packaging did not wreck the texture.' },
      { name: 'Harsh, Amar Colony', text: 'Feels closer to a good market momo order than most delivery-only kitchens.' }
    ]
  },
  {
    id: 'chaat-chowk',
    slug: 'chaat-chowk-karol-bagh',
    name: 'Chaat Chowk',
    area: 'Karol Bagh, Delhi',
    cuisines: ['Chaat', 'Street Food', 'Snacks'],
    rating: 4.3,
    reviewsCount: 1108,
    eta: '17-24 mins',
    priceForTwo: 300,
    badge: 'Delhi snack cravings',
    deliveryFee: 'Delivery from INR 25',
    openUntil: 'Open until 11:30 PM',
    description: 'Tang, crunch, chilled dahi and fast-moving Delhi snack cues for users who search directly by dish, not broad cuisine.',
    feedback: [
      { name: 'Rhea, Karol Bagh', text: 'The papdi stayed crisp enough and the chutney balance felt properly Delhi.' },
      { name: 'Manas, Pusa Road', text: 'Strong evening snack order. Sweet, spicy and tangy without becoming mushy.' }
    ]
  },
  {
    id: 'dosa-district',
    slug: 'dosa-district-noida',
    name: 'Dosa District',
    area: 'Sector 18, Noida',
    cuisines: ['South Indian', 'Breakfast', 'Filter Coffee'],
    rating: 4.4,
    reviewsCount: 887,
    eta: '23-30 mins',
    priceForTwo: 380,
    badge: 'Breakfast and tiffin pick',
    deliveryFee: 'Delivery from INR 29',
    openUntil: 'Open until 10:45 PM',
    description: 'A South Indian specialist focused on crisp formats, podi flavour and breakfast-to-dinner versatility for NCR workdays.',
    feedback: [
      { name: 'Kunal, Noida', text: 'The dosa stayed better than expected and the podi idli had proper ghee aroma.' },
      { name: 'Divya, Mayur Vihar', text: 'Reliable when you want something lighter but still flavour-first.' }
    ]
  },
  {
    id: 'wok-wala',
    slug: 'wok-wala-cyber-hub',
    name: 'Wok Wala',
    area: 'Cyber Hub, Gurgaon',
    cuisines: ['Chinese', 'Asian', 'Combos'],
    rating: 4.2,
    reviewsCount: 1336,
    eta: '26-33 mins',
    priceForTwo: 600,
    badge: 'Combo meal performer',
    deliveryFee: 'Free above INR 449',
    openUntil: 'Open until 12:15 AM',
    description: 'Desi-Chinese comfort bowls, combo logic and quick re-order behaviour modelled around Gurgaon group ordering.',
    feedback: [
      { name: 'Sakshi, Golf Course Road', text: 'The rice and gravy pairing felt like the exact combo you want on a long work night.' },
      { name: 'Yash, DLF Phase 1', text: 'Portion held up for sharing and the spice stayed lively after delivery.' }
    ]
  },
  {
    id: 'meetha-khaas',
    slug: 'meetha-khaas-defence-colony',
    name: 'Meetha Khaas',
    area: 'Defence Colony, Delhi',
    cuisines: ['Desserts', 'Kulfi', 'Fusion Mithai'],
    rating: 4.6,
    reviewsCount: 731,
    eta: '20-26 mins',
    priceForTwo: 360,
    badge: 'Dessert finish specialist',
    deliveryFee: 'Delivery from INR 29',
    openUntil: 'Open until 11:55 PM',
    description: 'Dessert-led storefront with rich Indian finishes, sharable jars and post-dinner add-ons that lift basket value.',
    feedback: [
      { name: 'Tanya, Defence Colony', text: 'The gulab jamun cheesecake jar is exactly the kind of over-the-top dessert people add last minute.' },
      { name: 'Aditya, Green Park', text: 'Good finishing order after a larger dinner. Sweet but still restaurant-grade.' }
    ]
  }
]

const dishBlueprint = food_list.map((item, index) => {
  const restaurant = restaurantCatalog[Math.floor(index / 4)]
  const position = (index % 4) + 1

  return {
    ...item,
    restaurantId: restaurant.id,
    restaurantSlug: restaurant.slug,
    restaurantName: restaurant.name,
    restaurantArea: restaurant.area,
    restaurantRating: restaurant.rating,
    restaurantReviewsCount: restaurant.reviewsCount,
    restaurantEta: restaurant.eta,
    restaurantPriceForTwo: restaurant.priceForTwo,
    restaurantOffer: restaurant.badge,
    restaurantDeliveryFee: restaurant.deliveryFee,
    restaurantOpenUntil: restaurant.openUntil,
    restaurantDescription: restaurant.description,
    cuisines: restaurant.cuisines,
    feedback: restaurant.feedback,
    popularityTag: position === 1 ? 'Best seller' : position === 2 ? 'Most reordered' : position === 3 ? 'High rating pick' : 'Late-night pick',
    spiceNote: position % 2 === 0 ? 'Balanced spice' : 'Bold spice',
    dishPosition: position
  }
})

export const fallbackFoods = dishBlueprint

export const normalizeMarketplaceFoods = (foods = []) => {
  if (!Array.isArray(foods) || foods.length === 0) return fallbackFoods

  return foods.map((food, index) => {
    const blueprint = dishBlueprint[index % dishBlueprint.length]
    return {
      ...food,
      name: food.name || blueprint.name,
      description: food.description || blueprint.description,
      price: food.price || blueprint.price,
      // Prefer DB image (Unsplash URL); fall back to local bundled PNG
      image: food.image || blueprint.image,
      category: food.category || blueprint.category,
      restaurantId: blueprint.restaurantId,
      restaurantSlug: blueprint.restaurantSlug,
      restaurantName: food.restaurantName || blueprint.restaurantName,
      restaurantArea: food.restaurantArea || blueprint.restaurantArea,
      restaurantRating: food.restaurantRating || blueprint.restaurantRating,
      restaurantReviewsCount: blueprint.restaurantReviewsCount,
      restaurantEta: blueprint.restaurantEta,
      restaurantPriceForTwo: blueprint.restaurantPriceForTwo,
      restaurantOffer: blueprint.restaurantOffer,
      restaurantDeliveryFee: blueprint.restaurantDeliveryFee,
      restaurantOpenUntil: blueprint.restaurantOpenUntil,
      restaurantDescription: blueprint.restaurantDescription,
      cuisines: blueprint.cuisines,
      feedback: blueprint.feedback,
      popularityTag: blueprint.popularityTag,
      spiceNote: blueprint.spiceNote,
      dishPosition: blueprint.dishPosition
    }
  })
}

export const buildRestaurantsFromFoods = (foods = []) => {
  return restaurantCatalog.map((restaurant) => {
    const items = foods.filter((food) => food.restaurantId === restaurant.id)
    const coverImage = items[0]?.image || fallbackFoods.find((food) => food.restaurantId === restaurant.id)?.image || ''

    return {
      ...restaurant,
      coverImage,
      items,
      menuHighlights: items.slice(0, 3).map((item) => item.name),
      avgDishPrice: items.length ? Math.round(items.reduce((sum, item) => sum + Number(item.price), 0) / items.length) : restaurant.priceForTwo / 2
    }
  })
}
