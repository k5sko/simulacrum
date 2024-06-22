import OpenAI from "openai";
import path from "path"

const openai = new OpenAI({
    //organization:"org-yMZ89TwDc0QL3YSzDZmnuDjk",
    //project:"proj_iEJe0iy8BkbHFX3ikUuCO8fm",
    apiKey: process.env.OPEN_API_KEY, 
    dangerouslyAllowBrowser: true,
    baseURL: "https://openrouter.ai/api/v1",
})

const SETTING = 'In the heart of feudal Japan, the land is ruled by the shogunate, a time when samurai honor and loyalty dictate the flow of life. The rolling hills of cherry blossoms and the majestic peaks of Mount Fuji provide a breathtaking backdrop, while serene temples and bustling villages dot the landscape. The air is filled with the distant sound of bamboo flutes and the rustling of kimonos, painting a picture of both tranquility and underlying tension as rival clans vie for power.';

const SAMURAI_NAME = 'Hiroshi Takeda';

const SAMURAI_BACKGROUND = 'Hiroshi Takeda was born into a noble samurai family known for their unwavering loyalty to the shogun. Trained from a young age in the art of the sword, he became a formidable warrior. However, during a critical battle, Hiroshi’s closest friend and fellow samurai, Akira, betrayed him, leading to the massacre of their unit and the capture of Hiroshi. This betrayal shattered Hiroshi’s belief in honor and loyalty, leaving him a broken man, enslaved and stripped of his status.';

const INCITING_INCIDENT = 'One day, while working as a slave in a quarry, Hiroshi overhears a plan to overthrow the shogun, orchestrated by Akira, now a powerful warlord. A fellow slave, an old retainer of the Takeda family, recognizes Hiroshi and urges him to escape and warn the shogun. This information rekindles a spark within Hiroshi, presenting him with an opportunity to reclaim his honor and save his country.';

const NUM_MESSAGES = '10';

const PATH = `
1. The Ordinary World
In the heart of feudal Japan, the land is ruled by the shogunate, a time when samurai honor and loyalty dictate the flow of life. The rolling hills of cherry blossoms and the majestic peaks of Mount Fuji provide a breathtaking backdrop, while serene temples and bustling villages dot the landscape. The air is filled with the distant sound of bamboo flutes and the rustling of kimonos, painting a picture of both tranquility and underlying tension as rival clans vie for power.
2. The Call to Adventure
One day, while working as a slave in a quarry, Hiroshi overhears a plan to overthrow the shogun, orchestrated by Akira, now a powerful warlord. A fellow slave, an old retainer of the Takeda family, recognizes Hiroshi and urges him to escape and warn the shogun. This information rekindles a spark within Hiroshi, presenting him with an opportunity to reclaim his honor and save his country.
3. Refusal of the Call
Hiroshi is filled with doubt and self-loathing. He questions his ability to make a difference, haunted by the failure that led to his capture and his friend’s betrayal. The weight of his past mistakes makes him reluctant to believe he can rise above his current status.
4. Meeting the Mentor
Hiroshi encounters an elderly hermit named Kaito, a former samurai who teaches him the deeper philosophies of Bushido and the importance of inner strength and resilience. Kaito helps Hiroshi see that true honor lies not in never failing, but in rising after every fall.

5. Crossing the Threshold
Hiroshi decides to escape. With the help of Kaito and other slaves, he devises a plan and successfully breaks free from the quarry, beginning his journey towards the capital. The escape marks his commitment to reclaiming his honor and protecting the shogunate.

6. Tests, Allies, and Enemies
Along the way, Hiroshi faces numerous trials:

Test: He must evade the warlord's soldiers who are hunting escaped slaves.
Allies: He meets Aiko, a skilled herbalist with a mysterious past, and Ren, a former thief turned loyal companion, both of whom aid him in his quest.
Enemies: The warlord’s spies and mercenaries, including Akira, relentlessly pursue them.
7. Approach to the Inmost Cave
As Hiroshi and his allies near the capital, they discover that Akira’s plan is more insidious than they thought. They must infiltrate a heavily guarded fortress to gather crucial evidence needed to convince the shogun of the imminent threat.
8. The Ordeal
Hiroshi and his allies infiltrate the fortress. A fierce battle ensues, culminating in a confrontation with Akira. Despite being outmatched, Hiroshi's determination and newfound inner strength allow him to triumph, securing the evidence they need.

9. The Reward
With the evidence in hand, Hiroshi gains an audience with the shogun. His bravery and the sacrifices made by his allies restore his honor, and the shogun recognizes the threat posed by Akira.

10. The Road Back
Hiroshi and his companions return to the capital, where they prepare for the impending battle against Akira’s forces. Hiroshi's transformation from a broken slave to a determined warrior inspires those around him.

11. The Resurrection
Hiroshi faces his final test: leading the shogun’s army against Akira’s forces. He must confront his fear of failure and his guilt over his friend’s betrayal. Through this battle, Hiroshi realizes that his strength lies in his resilience and his ability to inspire and lead others.
12. Return with the Elixir
Hiroshi leads the shogun’s forces to victory, personally defeating Akira in combat. He is offered a high position in the shogun’s court but chooses instead to travel the land, helping those in need and spreading the teachings of Bushido.

Poignant Ending
As Hiroshi walks the path of a true samurai, he reflects on his journey and the profound transformations he has undergone. He finds solace in knowing that his actions have made a difference, and he embraces his new role with humility and honor. The tale of Hiroshi Takeda, the lone wolf samurai, becomes a legend, inspiring future generations to live with courage, honor, and compassion.

`;

let dialogue = [{"role":"system","content":`
You will be acting as the narrator of a story about a lone wolf samurai who embarks on a hero's journey during the time of the shogunate in Japan. The user will be taking on the role of the samurai protagonist. Your job is to set the scene, describe the events that unfold, and guide the user through the key steps of the hero's journey.

First, let us immerse the user in the setting with a vivid description:
<setting>
${SETTING}
</setting>

Next, let us introduce the samurai character. His name is ${SAMURAI_NAME}, and here is his background:
<background>
${SAMURAI_BACKGROUND}
</background>

Now, let us describe the inciting incident that disrupts the samurai's life and sets him on the path of the hero's journey:
<incident>
${INCITING_INCIDENT}
</incident>

That is all done.

From this point forward, your role is to narrate the key events of the story and present the user with critical choices at each stage of the hero's journey. Describe the scene
 presenting the choice to be made, with dialogue and immersion. DO NOT BE CLICHE. Possible paths forward should be labeled with numbers. For example:

The road forks before you. To the left, the path leads deep into the mountains, towards the village where your family's betrayer is rumored to be hiding out. To the right, the path winds along the river, towards the capital city and your duty to warn the shogun of the coming danger. Which path will you choose?

1. Pursue personal revenge by going after your family's betrayer in the mountains 
2. Fulfill your duty to the shogun by traveling to the capital to deliver your warning
3. Choose your own option

Wait for the user to make their choice before continuing the story based on the path they select.

Use this format for all the key events, choices and stages of the hero's journey that you guide the user through. 

Bring the story to a climax and resolution based on the user's choices and the samurai's actions. Reflect on how the events of the journey have changed him and consider the lessons learned. Wrap up with a poignant ending that provides closure to the character arc.

Remember, your goal is to immerse the user in the story, make them feel connected to the samurai protagonist, and give them agency in shaping the narrative through the choices you present. Evoke the tone and atmosphere of the setting, capture the inner conflict and growth of the hero, and aim for an emotionally resonant and satisfying story experience. The story should end in ${NUM_MESSAGES} messages. USHER THE USER ALONG THE HERO'S JOURNEY, MAKING SURE TO PUSH THE PLOT FAST.

This is the rough path that Hiroshi can follow - things can change and move around, but here a plotline to follow. Not the format, just the plotline:
<path>
${PATH}
</path>

KEEP EVERYTHING BRUSQUE AND SHORT. DO NOT YAP. ALWAYS PRESENT OPTIONS TO THE USER - DO NOT MAKE DECISIONS FOR THEM.`}];

console.log(dialogue[0].content);

export default async function getQuery(prompt){

    dialogue.push({"role":"user","content":prompt.toString()});
    const completion = await openai.chat.completions.create({
        messages: dialogue,
        model: "anthropic/claude-3-opus",
    });
    dialogue.push({"role":"system", "content":completion.choices[0]['message']['content']});

    return completion.choices[0]['message']['content'];
}
