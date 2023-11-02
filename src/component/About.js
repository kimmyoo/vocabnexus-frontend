import React from 'react'
import quick_add from '../assets/images/quick_add.jpg'
import new_node from '../assets/images/new_node.jpg'
import add_definition from '../assets/images/add_definition.jpg'
import toggle_definition from '../assets/images/toggle_definition.jpg'
import add_nexus from '../assets/images/add_nexus.jpg'
import nexus_added from '../assets/images/nexus_added.jpg'
import edit_mode from '../assets/images/edit_mode.jpg'

const About = () => {
    return (
        <div className="about">
            <h3>About VocabNexus</h3>
            <p>
                Undeniably, memorization is a necessary process
                for any new language learning process.
                It's especially true at the beginning stage for someone to
                have a certain amount of basic and fundamental
                vocabulary.

                Reading is defintely helpful for increasing someone's vocabulary.
                However, it's challenging for someone who is still at the beginning stage of learning.
                Many people were discouraged to read more when their reading speed is limited by inadequate vocabulary.
                it seems like a dilemma.
            </p>
            <p>
                Some language learners rely on vocabulary book which lists all vocabulary in alphabetical order with
                definitions and sample sentences. The way of memorizing the vocabulary book is boring and inefficient most of time.
                The reason why it won't work for many people is because of the alphabetical order.
                Words are grouped in alphabetical order however those adjancent words might have no connection in meaning or logical context.
            </p>
            <p>
                VocabNexus came into existence based on my own way of increasing my vocabulary.
                That is to actively establish a nexus(connection) between the word you already know and
                the new word you encountered or during reading process (active reading is still crucial).
            </p>
            <p>
                The key and trick to train yourself to come up with any word that you already know to set up a connection between the
                the new word and the word you know. The question you may ask is "how do I establish the connection?". My answer is however you want.
                you can think of the antonym, synonym of the word; you can think of any word that has the same prefix or suffix;
                use your imagination. It doesn't matter the connection might seem weird to other people. The important part of this process is to
                group as many words as you can IN YOUR OWN WAY ACTIVELY. The words grouped together become a cluster of nodes.
                train your brain to loop through every word in that cluster once you see any word from that cluster.
                By doing this, you memorize the words in groups, not individually without any logical connection.
            </p>

            <div className='instruction'>
                <h3>NexusVocab Walk-through</h3>
                <ul>
                    <li>1. using ‘Quick Add’ to document an unfamiliar or new word.</li>
                    <img src={quick_add} alt="quick add instruction" />
                    <li>
                        2. the word is now represented in a circular node with some buttons to allow you
                        toggle definitions, Edit the node, add definition, or add a nexus(establish a connection to another node or word).
                        if you liked this word, click the heart emoji; if you grasped this word, click the smiley face emoji.
                        recently liked or grasped words will be displayed in profile page.
                    </li>
                    <img src={new_node} alt="" />
                    <li>
                        3.let's add a definition by clicking the Add Definition button(you can add more than one definition since one word might have different definitions).
                        <img src={add_definition} alt="" />
                    </li>
                    <li>
                        4. once you have a definition added to this word. you can use toggle definition button
                        to show/hide the definition or example sentence.
                        <img src={toggle_definition} alt="" />
                    </li>
                    <li>
                        5. now it's time to extend a nexus from this unfamiliar word to one of your words that you already know.
                        when i see this word pancytopenia and I looked up the definition which means low level of ALL blood cell.
                        I can think of panorama. because pan- means all. I will establish this logical connection or my imagination by
                        clicking Add Nexus button. you can try searching "panorama" in your word list if you added this word before
                        or you can add "panorama" and create it as a new node. in this case, the search didn't return "panorama",
                        I will simply create a new node with "panorama" in it.
                        <img src={add_nexus} alt="" />
                    </li>
                    <li>
                        6. After clicking Add button, Congretulations! Your very first nexus has been established.
                        click on the note emoji, you will see how you came from "pancytopenia" to "panorama"
                        <img src={nexus_added} alt="" />
                    </li>
                    <li>
                        7. I have added more words that I can come up with within my capability.
                        If you need to edit the word itself or definitions or delete
                        nexus or even delete the node entirely, click Edit Mode button.
                        <img src="" alt="" />
                        <img src={edit_mode} alt="" />
                    </li>

                </ul>
                <p className='selected'>
                    This app is for demo and learning purpose. it uses free tier of web services.
                    It automatically spins down after 15 minutes of inactivity.
                    When a new request comes in, it spins it up to process the request.
                    This can cause a response delay of up to 30 seconds.
                </p>
                <a href="/">Back</a>
            </div>
        </div>
    )
}

export default About