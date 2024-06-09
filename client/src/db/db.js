import Dexie from 'dexie';
import footballerService from '../utils/footballerService';

export const db = new Dexie('offlineDB');
db.version(1).stores({
    footballers: '++id, name, age, position, method, _id'
});

export const saveFootballersLocally = async (footballerData, method) => {
    await db.footballers.add({...footballerData, method});
}

export const syncDataWithBackend = async () => {
    const offlineFootballersData = await db.footballers.where('method').anyOf('POST', 'PUT').toArray();

    for (let footballerData of offlineFootballersData) {
        if (footballerData.method === 'POST') {
            const newFootballer = {name: footballerData.name, age: footballerData.age, position: footballerData.position};
            try {
                await footballerService.addFootballer(newFootballer);
            } catch (error) {
                console.error('Error syncing footballer data', error);
            }
        }
        else if (footballerData.method === 'PUT') {
            const updatedFootballer = {name: footballerData.name, age: footballerData.age, position: footballerData.position};
            try {
                await footballerService.updateFootballer(footballerData._id, updatedFootballer);
            } catch (error) {
                console.error('Error syncing footballer data', error);
            }
        }
        await db.footballers.update(footballerData.id, {method: 'synced'});
    }
}

export const clearOfflineDb = async () => {
    try {
        await db.delete();
    } catch (error) {
        console.error('Offline db data could not be deleted', error);
    }
}

