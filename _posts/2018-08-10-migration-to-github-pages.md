---
layout: post
title:  "Migration To Github Pages"
date:   2018-08-10 18:39:10 -0400
categories: new website
author: Timothy Lock
---

Over the past week, I took up a new challenge to learn how to use GitHub Pages (which uses Jekyll). This was one of the
first times that I have worked with a compiled website whereas previously I would rely on PHP to handle the theming, 
generating the page, etc. 

As a first time user/developer on Jekyll, I compiled a list of things that I really loved and some of which that I didn't

## Good things
- Pages are automatically generated and theming can remain in one place
- Blog posts and pages can be written in markdown and generated into html pages
- My legacy blog posts from Wordpress were easily converted using Jekyll's import feature
- Pages can still be written in HTML if you desire. All of my legacy posts are in HTML and almost indistinguishable from
  my new markdown pages
- *The overhead is a lot lower compared to PHP*
    - benefit of having a site compiled to a static site rather than generated on the fly
- I can host it on GitHub Pages 😎
  
## Bad things
- Pages can't be dynamically generated because its only generated once before the output is stored
    - only way around this is to use Javascript and change it client-side
- The default theme I ended up changing did not include Bootstrap and adding it myself seems to break a lot of things.
I'm not sure if I want to invest in putting it in if I don't need it. 

By using this system, I essentially killed three birds with one stone (sped up my site, removed the Wordpress docker 
pod from my server, and migrated all of this off my server). Hopefully this stays up and proves to be useful. I still 
have the old pods up in my server and can switch back to it easily if I feel like I don't like this new system. 
