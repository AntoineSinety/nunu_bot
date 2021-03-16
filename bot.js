

const Discord = require("discord.js");
const client = new Discord.Client();

var fs = require("fs");
const { env } = require("process");



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
        console.log(voices);
    }

    if (msg.content.toLowerCase().includes('stream')) {
        var strgDougi = compte_a_rebours();
        msg.channel.send(strgDougi);
        console.log(voices);
    }
    
    if (msg.content.toLowerCase().includes('rs')) {
        msg.channel.send('N\'oubliez pas de vous sub aux réseaux sociaux : Twitch: twitch.tv/MisterDougi / Twitter : @MisterDougi / Wikipédia : wikipedia.com/dieu');
        console.log(voices);
    }
    
});



client.login(process.env.NUNU_TOKEN);