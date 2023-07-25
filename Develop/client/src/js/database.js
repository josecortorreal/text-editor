import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jatedb = await openDB('jate', 1);
    const tx = jatedb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    await store.put(content);
    console.log('Content added to the database:', content);

    await tx.complete;
  } catch (error) {
    console.error('Error while adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jatedb = await openDB('jate', 1);
    const tx = jatedb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    const allContent = await store.getAll();
    console.log('All content retrieved from the database:', allContent);

    await tx.complete;

    return allContent;
  } catch (error) {
    console.error('Error while getting content from the database:', error);
    return [];
  }
};
initdb();
