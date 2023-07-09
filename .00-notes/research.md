questions
- can we store images on cloudflare r2
- can directus image resize do everything we need? - see cloudinary
- how would image caching work?
- how will routing work with nextjs / directus data
- how will caching work for data
- should we use neondb or supabase?
- how to manage multilang? (hreflang tag) path/subdomain/tld?
  - root level for en and other languages would be /es /it etc.


SN current structure:
app         /
app         /enquiries
page        /privacy-policy
page        /terms
category    /fly-in-safaris
category    /self-drive
tour        /self-drive/7-day-namibia-tour
tour        /self-drive/12-day-private
post        /safari-guides/my-blog-post
post        /namibia-weather/01-january


every route stems from database so we can do SEO / browser title etc.

/[parent slug]/[slug]
/enquiries

allow 2 levels only (recommeded for seo anyway)



// 
on route create/update set the full_path

routes
full_path

trigger on update/create route:
if (collection === 'tour') {
  pathname = tour.main_category + '/' + slug
}

trigger also needs to run when tour updates category!!!


//
/[parent slug]/[slug] -> nextjs routable component
/enquiries -> nextjs static component


/privacy-policy -> lookup routes table -> lookup page by route.item
```
filter[slug][_in]=privacy-policy
fields[]=routable.*
```

/flyin/8day -> lookup routes table for (flyin and 8day) -> make sure both routes came back otherwise ignore
```
filter[slug][_in]=fly-in-safari,namibia-safaris-from-windhoek
fields[]=routable.*
```
