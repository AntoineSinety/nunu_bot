require('dotenv').config();


const Discord = require("discord.js");
const client = new Discord.Client();

const fetch = require("node-fetch");

var fs = require("fs");


var serverPerso= {
    id: 492363511226302465,
    nbMessage: null
}
var serverAmi= {
    id: 297377546041950218,
    nbMessage: null
}

var startHour =  new Date();

var idPandOurs;


client.on('ready', () => {
  console.log('I am ready!');
//    client.user.setActivity('Bot incompris');
    client.user.setActivity('rouler.', { type: 'PLAYING' });
    idPandOurs = client.user.id;       
    
});



var voices = {
    0: "Ne mettez pas le yéti en colère. Vous n'avez pas envie de voir le yéti en colère.",
    1: "Vous ne pouvez pas m'attraper.",
    2: "C'est pas fini, car voilà qu'arrive le grand yéti !",
    3: "Ha. Ha. Ha. Ha. Ha. Ha."
} 

function compte_a_rebours()
{
    var compte_a_rebours;

    var date_actuelle = new Date();
    var date_evenement = new Date('2021-03-20T16:00:00');
    var total_secondes = (date_evenement - date_actuelle) / 1000;

    var prefixe = "Il reste ";
    if (total_secondes < 0)
    {
        prefixe = "Compte à rebours terminé il y a "; // On modifie le préfixe si la différence est négatif
        total_secondes = Math.abs(total_secondes); // On ne garde que la valeur absolue
    }

    if (total_secondes > 0)
    {
        var jours = Math.floor(total_secondes / (60 * 60 * 24));
        var heures = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
        minutes = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
        secondes = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

        var et = "et";
        var mot_jour = "jour(s),";
        var mot_heure = "heures,";
        var mot_minute = "minutes,";
        var mot_seconde = "secondes";

        if (jours == 0)
        {
            jours = '';
            mot_jour = '';
        }
        else if (jours == 1)
        {
            mot_jour = "jour,";
        }

        if (heures == 0)
        {
            heures = '';
            mot_heure = '';
        }
        else if (heures == 1)
        {
            mot_heure = "heure,";
        }

        if (minutes == 0)
        {
            minutes = '';
            mot_minute = '';
        }
        else if (minutes == 1)
        {
            mot_minute = "minute,";
        }

        if (secondes == 0)
        {
            secondes = '';
            mot_seconde = '';
            et = '';
        }
        else if (secondes == 1)
        {
            mot_seconde = "seconde";
        }

        if (minutes == 0 && heures == 0 && jours == 0)
        {
            et = "";
        }

        compte_a_rebours = prefixe + jours + ' ' + mot_jour + ' ' + heures + ' ' + mot_heure + ' ' + minutes + ' ' + mot_minute + ' ' + et + ' ' + secondes + ' ' + mot_seconde;
    }
    else
    {
        compte_a_rebours = 'Compte à rebours terminé.';
    }
    compte_a_rebours +=  ' avant le premier live de MisterDougi ! '
    console.log(compte_a_rebours);
    return compte_a_rebours;
}






client.on('message', msg => {

    console.log(msg.content);

    if (msg.content.toLowerCase().includes('hihi')) {
        msg.channel.send(voices[Math.floor(Math.random() * Math.floor(4))]);
        // msg.channel.send('J\'voulais dire "It\'s" :( ');
        // console.log(voices);
    }

    if (msg.content.toLowerCase().includes('!stream')) {
        var strgDougi = compte_a_rebours();
        msg.channel.send(strgDougi);
        // console.log(voices);
    }
    
    if (msg.content.toLowerCase().includes('!rs')) {
        msg.channel.send('N\'oubliez pas de vous sub aux réseaux sociaux : Twitch: twitch.tv/MisterDougi / Twitter : @MisterDougi / Wikipédia : wikipedia.com/dieu');
        // console.log(voices);
    }

    if (msg.content.toLowerCase().includes('antoine')) {
        msg.react("490170545447501839");
    }
    if (msg.content.toLowerCase().includes('albe')) {
        msg.react("490164238183038976");
    }
    if (msg.content.includes('albé')) {
        msg.react("490164238183038976");
    }
    if (msg.content.toLowerCase().includes('thomas')) {
        msg.react("557866810653933589");
    }
    if (msg.content.toLowerCase().includes('random')) {
        msg.react("🐙");
        console.log(msg.content);
    }
    if (msg.content.toLowerCase().includes('!io')) {

                var pseudo = msg.content.substring(4);
                var resultIO;

                
                const url = "https://raider.io/api/v1/characters/profile?region=eu&realm=Dalaran&name="+ pseudo +"&fields=mythic_plus_scores_by_season%3Acurrent";
                const options = {
                headers: {
                    Accept: 'application/json'
                }
                };
                fetch(url, options)
                .then( res => res.json() )
                .then( (data) => {
                    resultIO = data.name + " possede actuellement un score io de : " + data.mythic_plus_scores_by_season[0].scores.all;
                    msg.channel.send(resultIO);
                } 
                );


    }
    if (msg.content.toLowerCase().includes('!affixes')) {

                var resultIO;
                
                const url = "https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=fr";
                const options = {
                headers: {
                    Accept: 'application/json'
                }
                };
                fetch(url, options)
                .then( res => res.json() )
                .then( (data) => {
                    var details ="";
                    data.affix_details.forEach(element => {
                        details += element.description + '\n \n';
                    });
                    msg.channel.send({
                        embed: {
                            color: 3447003,
                            title: "Les affixes sont : ",
                            description: data.title,
                            fields: [{
                                name: "Détails : ",
                                value: details
                            }]
                        }
                    });
                } 
                );


    }
    if (msg.content.toLowerCase().includes('!djdone')) {

                var resultIO;
                var pseudo = msg.content.substring(8);
                
                const url = "https://raider.io/api/v1/characters/profile?region=eu&realm=Dalaran&name="+pseudo+"&fields=mythic_plus_recent_runs";
                const options = {
                headers: {
                    Accept: 'application/json'
                }
                };
                fetch(url, options)
                .then( res => res.json() )
                .then( (data) => {
                    var details ="";
                    data.mythic_plus_recent_runs.forEach(element => {
                        details +=  "**"+ element.short_name + '** M+' + element.mythic_level + ',           date : ' +  element.completed_at.slice(8,10) +'-' + element.completed_at.slice(5,7)+ ' \n \n';
                    });
                    msg.channel.send({
                        embed: {
                            color: 3447003,
                            title: "Donjons fait récement:  ",
                            description: data.title,
                            fields: [{
                                name: "Liste : ",
                                value: details
                            }]
                        }
                    });
                } 
                );


    }

    
});

// Adding reaction-role function
// client.on('messageReactionAdd', async (reaction, user) => {
//     //Filter the reaction
//     if (reaction.id === '🐙') {
//      // Define the emoji user add
//      let role = message.guild.roles.cache.find((role) => role.name === 'random');
//      if (message.channel.name !== 'roles') {
//       message.reply(':x: You must go to the channel #alerts');
//      } else {
//       message.member.addRole(role.id);
//      }
//     }
//    });
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '821679471681077258') {
      if (reaction.emoji.name === '🐙') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add('821679357344743475');
      }
    } else return;
  });
  
  // Removing reaction roles
  client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '821679471681077258') {
      if (reaction.emoji.name === '🐙') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('821679357344743475');
      }
    } else return;
  });
  



client.login(process.env.NUNU_TOKEN);