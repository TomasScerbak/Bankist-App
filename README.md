# Frontend Mentor - Suite landing page solution

This is a solution to the [Suite landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/suite-landing-page-tj_eaU-Ra). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements

### Links

- Solution URL: [https://github.com/TomasScerbak/suite-landing-page.git]
- Live Site URL: [https://tomasscerbak.github.io/suite-landing-page/]

## My process

### Built with

- Semantic HTML5 markup
- SASS / SCSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

This is my first project build by SCSS language and systax. I've learned how to create different files with variables, functions, typography, resets and import them to main css file. I was using @include syntax, created functions for different flexbox leyaouts and variables for different font sizes.

From the HTML persective, I learned to provide to user different img quality depending on device using WEBP format and @2x formats for RETINA displey.

To see how you can add code snippets, see below:

```html
            <picture>
              <source
                type="image/webp"
                media="(min-width: 600px)"
                srcset="
                  images/image-hero-portrait.png     1x,
                  images/image-hero-portrait.webp    1x,
                  images/image-hero-portrait@2x.png  2x,
                  images/image-hero-portrait@2x.webp 2x
                "
              />
              <source
                type="image/webp"
                media="(min-width: 300px)"
                srcset="
                  images/image-hero-landscape.png     1x,
                  images/image-hero-landscape.webp    1x,
                  images/image-hero-landscape@2x.png  2x,
                  images/image-hero-landscape@2x.webp 2x
                "
              />
              <img
                class="phone__image"
                src="images/image-hero-landscape.webp"
                alt="picture of apple phone"
              />
            </picture>
```
```css
@function weight($weight-name) {
  @return map-get($font-weights, $weight-name);
}

@mixin flexCenter($direction) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

@mixin flexEnd($direction) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: $direction;
}

@mixin flexSpaceBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@mixin flexSpaceEvenly {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

```

### Continued development

from now on I will be practicing SASS syntax and try to use best practices to learn clean maintainable code.

## Author

- Website - [Tomas Scerbak](https://tomasscerbak.github.io/tomas-scerbak-portfolio/)
- Frontend Mentor - [@Potato](https://www.frontendmentor.io/profile/TomasScerbak)
