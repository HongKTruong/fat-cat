# Fat Cat
Fat Cat is a Node.js Discord bot whose main purpose is to repost bigger (fatter) versions of
custom emojis. It also allows custom commands to be added with a corresponding word or link. It is hosted on [Glitch](http://glitch.com) 24/7 using [Uptime Robot](https://uptimerobot.com).

# How to Use
To see what Fat Cat is capable of, type `!help`.

## The Main Dish: Bigger and Better Custom Emojis
### Fatten Up Those Emojis
Start your message with `!` followed by the emoji. For example, if you have an 
emoji called `thicc`, type one of the following:
* `! :thicc:`
* `!:thicc:`

### Fatten Up Multiple Emojis
Fat Cat can also scan your message for multiple emojis at the price of one message!

    `! :thicc: ignoreme :thicc:`
  
Fat Cat will post the first emoji, followed by the second emoji in a new post.
It ignores any text that is not an emoji. Just make sure the emojis are separated
by spaces.

## Some Side Dishes
- `add <command> <link>` will save the custom command and corresponding link to Fat
Cat's memory
- `delete <command>` will delete the custom command
- `<command>` causes Fat Cat to post the `<link>` associated with the command
- `<commands>` lists all the custom commands known to Fat Cat

## Secret Catnip
Fat Cat will actually post any custom emoji you have on your client. So if you
have emojis on another server, Fat Cat will post those as well!

Be careful with edits though, since Discord will automatically convert your custom
emoji's text to whatever premade Discord emoji is closest.

# Installation
1. Grab this repo via download or cloning
2. Create a Glitch project
3. Import Fat Cat to your Glitch project
4. Setup a monitor on Uptime Robot to keep Fat Cat awake by poking him every 5 minutes
5. Get your bot up and running using this [guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

Check out [Resources](#resources) for more detailed steps!

# The Inner Mechanisms of a Fat Cat
Here's a step-by-step of how Fat Cat thinks

1. Fat Cat reads your messages (both newly posted and edited)
2. He checks that your message starts with `!`
3. He breaks up your message by separating words by spaces
4. He checks whether each word is a valid custom-emoji on your client
5. If the emoji is valid, he grabs the emoji's URL
6. Finally, he posts the large emoji using the URL as an attachment

# FAQ
## Do Big Cats Smell Big Edits?
Yes! If you edit your message, Fat Cat will post any newly added emojis! If you
modified the above with:

  `! :thicc: ignoreme :thicc: :thicc:`
  
Then Fat Cat will post an additional `:thicc:` emoji.

*Note: Fat Cat does a simple comparison of space-separated words between the
unedited and edited message. So if add something different to the beginning
of your message, Fat Cat will repost all of the emojis after it :/.

## What About Normal Emojis?
Those already get big enough on their own, they don't need Fat Cat's help.
Fat Cat only likes to sniff out custom emojis >:(.

# Resources
* [An Idiot's Guide](https://anidiots.guide) really helped me out with
creating my first Discord bot!
* [Discord.js Documentation](https://discord.js.org/#/docs/main/master/general/welcome)
is extremely useful if you're venturing into unknown territory (or your
just have terrible Google Fu).