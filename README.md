
# Discord Bot Template

This is a basic discord bot template made with node.js and discord.js. This template is a scailable way to create discord bots with varying complexity. You can use this template with very minimal knowledge of js but scailing it up will need you to know more complicated topics such as mongoDB and mapping.

Don't worry if you're just wanting to get something simple started up you don't need to know what every component of the template does. Just get familiar with creating new commands and you will be up and ready to go

## Getting Started

Download the project from this repo and oopen up your terminal in the folder and run the following commands

```bash
  npm install
  npm run dev
```
## Creating new commands

Taking a look here we can easily just create new commands by defining a new file in the commands folder. Every command must have a unique ``.setName()`` command name
```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        // here we set the name of the command and the description
        .setName("example")
        .setDescription("example command"),
    async execute(interaction) {
        interaction.reply({
            embeds: "Example reply",
            ephemeral: true
        })
    }
}
```

The command execution should be executed inside the ``async execute()...`` function
## Auto Complete

For commands with an auto complete feature for your inputs take a look at ``./commands/autocomplete.js``

```javascript
    .addStringOption(option => 
        option.setName('options')
        .setDescription('example option')
        .setRequired(true)
        .setAutocomplete(true)

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 
        'Library: Voice Connections', 'Interactions: Replying to slash commands', 
        'Popular Topics: Embed preview'];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
```
Here we use ```.setAutocomplete(true)``` to tell discord that we are using autocomplete in this commands

We then set the function async ```autocomplete(interactoin)```

Inside this function, we create an array of choices to create an autocomplete from. 

As we type in the command we can use the ```choices.filter(choice => choice.startsWith(focusedValue))```
to filter through the array
## More Complicated Commands
Discord has a limit to how many values we can set in the ```choices`` aray from our autocomplete.
We can only set a total of 25 items, and how can we use this with our database to retrieve real time data?

Here for a more complicated example, we are looping through sports teams and creating an autocomplete

We must start by creating a teams model in ``./models/teams.js``

```javascript
const mongoose = require('mongoose')

const teamsSchema = new mongoose.Schema({
    id: String,
    name: String,
    logo: String,
    color: String,
    league: String,
})
module.exports = mongoose.model("teams", teamsSchema)
```

You can disregard everything except for ``name: String`` for now, we will see the uses for the others later

Now we create a new file in the commands folder and set do everything the same from our autocomplete example

```javascript
const teamDB = require('../models/teams.js')

    //regular command setup

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused(true)
        teamDB.find({}).then(async res => {

            const choices = res.map(games => games.name)

            const filtered = choices.filter(choice => {
                if(choice){
                    return choice.startsWith(focusedValue.value)
                }
            })
            let options;
            if (filtered.length > 25) {
                options = filtered.slice(0, 25).map(choice => {
                    return {
                        name: choice
                    }
                })
            } else {
                options = filtered.map(choice => {
                    return {
                        name: choice
                    }
                })
            }
            await interaction.respond(
            options.map(choice => (choice))
            )
        })
    },
```

Ok if this seems confusing don't worry I can explain

Here we begin by collectng all the teams from our DB using ``teamDB.find({})`` (if you would like to have a more specific search in your DB you can use ``teamsDB.findOne({ name: "some value"})`` read mongoDB docs if you're interested)

once we have collected this data, we map it and create a new array with just the names

then we can filter the choices like before

For the interesting part, we can check if the length of the choices array is > 25 and if it is, we can slice it to a length of 25

Boom! we have solved the problem of choices > 25 and using data from our DB

## Deployment

To deploy this project run. You can deploy this bot in production mode in heroku or just keep it running locally on your machine

set the production to true in the ``.env`` file

```bash
  node index.js
```
