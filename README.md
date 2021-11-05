# MusicMatcher
Music Matcher is a web application that allows user to search artist from one of the lyrics they remembered or somewhat close to what they remember while forgetting the song's name. Music Matcher will show the 5 most recent songs the user searched for. Songs could be streamed with Song title and artist and lyrics of the playing song will be displayed.

## User Story
As a user, when I load the page
Then I can search for an artist.
When I searched for an artist.
Then I get up to 5 similar artists.
When I click on one of the artists.
Then I get the Top 5 Tracks of the artist.
When I click on the track.
Then I can see the lyrics and can play/pause the song.
When I search another artist.
Then I will have recent searched artist saved on the Recent request area.


## Built With
* HTML
* CSS
* Bulma
* JavaScript
* API

## HTML
*The main index page to display the basic structure of Music Matcher.

## CSS/Bulma
* Custom and open source styling for Music Matcher which display differnt colors, font-size and display size on different screens.
* Bulma is able to do the flex wrap which saves a lot of work from flex wrapping from CSS.

## JavaScript
* Activating the click function for users to search artist from the page.
* Fetch data from API and return JSON parsed data.
* Dynamically generate up to 5 button elements as similar artists.
* Dynamically generate up to 5 button elements as top 5 tracks of the artist.

## API Research
* Spotify
* Youtube
* Shazam
* MusicBrainz
* LastFM
* Musixmatch
* Tenor
* Giphy

## API Used
* Napster
* Lyrics.ovh

## Challenges
* We went into problem with CORS and Tokens for APIs.
* Audio are only available for 30 seconds
* Some lyrics are not available due to free resource limitation. Many apis requires a paid subscription


## After thought
In our future project, we may try no to add music streaming feature because there were a lot of issues with tokens, apikeys and cors. We also have an unexpected bulk data returned from lyrics api and we have to create a bunch of replacement string to get rid of the extra syntax comes with the fetch. This project is too small for a group of 5 to work on and distribute duties.


## Website
https://mockcomic.github.io/MusicMatcher

## Image of Website
![ScreenShot](https://)
