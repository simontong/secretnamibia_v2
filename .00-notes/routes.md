======================
routes - pathname / seo setup for objects

- id
- routable_type (pages,posts,categories,tours etc.)
- routable_id
- parent_id
- slug
- pathname - full slug path (including parents)
- seo - JSON (keywords,description,fb data,twitter, html schema)

======================
pages - standard content page (privacy / t&c etc.)

- id
- title
- content

======================
posts - blog posts

- id
- date
- title
- image_thumb
- image_hero
- teaser
- content

======================
categories - categories for tours

- id
- title

======================
tours - itineraries

- id
- title
- image_thumb
- image_hero
- teaser
- map
- overview

======================
tours_categories - tour categories

- id
- category_id
- tour_id
- is_primary
- uniq(category_id,tour_id,is_primary)

======================
tours_highlights - tour features / highlights

- id
- tour_id
- highlights_id

======================
tours_images - tour gallery

- id
- tour_id
- image
- sort

======================
tour_days - tour day-to-days

- id
- location_id
- lodge_id
- title
- content
- sort

======================
tour_days_activities - tour day-to-day activities

- id
- tour_day_id
- activities_id
- is_optional

======================
tours_posts - tour related posts

- id
- tour_id
- post_id
- uniq(tour_id,post_id)

======================
tours_tours - tour related tours

- id
- left_tour_id
- right_tour_id
- uniq(left_tour_id,right_tour_id)

=====================
highlights

- id
- title

======================
inclusions

- id
- title

======================
destinations

- id
- title

======================
lodges

- id
- title

======================
activities

- id
- title

!!!!!!!!!!!!!!!! LATER !!!!!!!!!!!!!!!

======================
animals

- id
- title

======================
vehicles

- id
- title

we are on /private-guided

```ts
// 1. first fetch to get route type
// fetch <worker_url>/get/routable?slug=7-day-safari

const route = {
	slug: "private-guided",
	routable_type: "category",
	routable_id: "abc-def-123-456",
};

// -----------
// 2. second fetch to get routable data 
// fetch <worker_url>/get/{data.routable_type}/{data.routable_id}

const data = {
	category: {
		name: "Private Guided",
		tours: [
			{
				route: { slug: "7-day-safari", routable_type: "tour", routable_id: 123 },
				name: "7 day safari",
				categories: [
					{
						route: { slug: "self-drive", routable_type: "category", routable_id: 123 },
						name: "Self-drive Safaris",
					},
				],
			},
			{
				route: { routable_type: "tour", routable_id: 4858 },
				name: "12 day fly-in",
				categories: [
					{
						route: { slug: "self-drive", routable_type: "category", routable_id: 123 },
						name: "Self-drive Safaris",
					},
				],
			},
		],
	},
};
```
