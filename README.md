Bearly Waste: Snap it, Sort it, Save the planet.

https://www.youtube.com/embed/lFS6KhOjxyg?si=gqRf-jQD3wjP397i

## Inspriration
Bearly Waste was inspired by the thought of helping people become more environmentally conscious. We realized that many people are unsure of how to properly recycle, so what if we gamified that process?

## What it does
A web app designed to assist in classifying whether an object is recyclable, compostable, or just trash. Either upload a photo, or take one with the live camera, and the AI will classify it for you. If the object happens to be recyclable, it will display a map with the recycling centers closest to your current location, otherwise it will tell you how to better use or simply discard the object. As you continue to find more recyclable and compostable items, you earn EXP that you can spend on treats to feed our mascot, Binnie, and make him happy.

## How we built it
We built Bearly Waste using react.js and TailWind CSS for the frontend to create a clean, responsive interface. For the AI classification, we used TensorFlow.js with the MobileNet model to detect recyclables directly in the browser. We integrated Google Maps API to display nearby recycling centers whenever the AI detects a recyclable item. Binnie’s pet logic and XP system were built with React Hooks for real-time updates, allowing players to spend their XP and affect his happiness levels instantly.

## Challenges we ran into
Experienced some issues with integrating the Google Maps API, mostly with how to tie in the API key. We also had to fix any silent interactions the map would have with the UI (a lack of a specific height would lead to the map rendering but turning invisible). We also experienced some issues with integrating our initial mascot, an 8-bit animated image that had more animations and interactions to keep track of.

## Accomplishments that we're proud of
We successfully connected machine learning, interactive maps, and game mechanics into one seamless web experience. We created an app that not only teaches recycling but encourages real-world action. We also designed a system where users can directly see the impact of their actions through Binnie’s emotions.

## What we learned
We learned how to integrate TensorFlow.js into a react web app to perform real-time image classification. We gained experience working with the Google Maps API to dynamically display nearby recycling centers. Most importantly, we learned how gamification can inspire users to adopt eco-friendly behaviors and how small design details, like Binnie’s mood, can make a big difference in user engagement.

## What's next for Bearly Waste
Upgrade the map to show more locations that we do not have to hard code in as POIs, also add a function to allow the user to actually navigate to the recycling center of their choice rather than simply viewing their distance from one. Also find a way to better integrate our initial mascot idea with smoother animations and more interactions.