import path from 'path';
import axios from 'axios';
import fs from 'fs-extra';

const url = 'http://laravel.suisvr.zeus.sss/used-tmasa';
const params = {
	syozok: 910, 
	kjob: '20180701,20180731', 
}
Promise.resolve().then(async e => 
{
	const usedTokuno = await axios.get(url, { params }).then(res => res.data);
	const data = [
		'[', 
		usedTokuno.map((tmasa) => JSON.stringify(tmasa)).join(',\n'), 
		']', 
	].join('\n');
	fs.writeFile(path.resolve(__dirname, 'usedTokuno.js'), data);
});