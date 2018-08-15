'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Books', [{
			title: 'Call of Cthulhu',
		    date: '1926-02-20',
		    author: 'Howard Phillips "H. P." Lovecraft',
		    description: `The Call of Cthulhu is an internationally renowned horror masterpiece by H. P. Lovecraft. Three independent narratives linked together by the device of a narrator discovering notes left by a deceased relative. Piecing together the whole truth and disturbing significance of the information he possesses, the narrator's final line is ''The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents.'' The narrator, Francis Wayland Thurston, recounts his discovery of notes left behind by his grand-uncle, Brown University linguistic professor George Gammell Angell, after his death in the winter of 1926–27. Among the notes is a small bas-relief sculpture of a scaly creature which yields "simultaneous pictures of an octopus, a dragon, and a human caricature." The sculptor, a Rhode Island art student named Henry Anthony Wilcox, based the work on delirious dreams of "great Cyclopean cities of titan blocks and sky-flung monoliths." Frequent references to Cthulhu are found in Wilcox's papers.`,
		    image: 'https://images-na.ssl-images-amazon.com/images/I/61qGiamEMnL._SX331_BO1,204,203,200_.jpg',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

    down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Books', null, {});
    }
};
