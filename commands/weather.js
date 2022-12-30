import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

	
const a = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo');

console.log(a.data);

export default {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Replies todays weather'),
	async execute(interaction) {

        const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&timezone=Asia%2FTokyo&hourly=temperature_2m&timezone=Asia%2FTokyo');
        const data = res.data;
	
		await interaction.reply(String(data.latitude));
	},
};