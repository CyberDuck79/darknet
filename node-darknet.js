const { spawn } = require('child_process');

const darknet = spawn(
	'./darknet',
	[
		'detector',
		'test',
		'cfg/coco.data',
		'yolov4-csp.cfg',
		'yolov4-csp.weights',
		'-ext_output',
		'-dont_show'
	]
);

const images = ['dog.jpg', 'eagle.jpg', 'giraffe.jpg', 'horses.jpg', 'person.jpg', 'scream.jpg']

darknet.stdout.on('data', (data) => {
	let output = data.toString();
	console.log(output);
	if (output.includes('Enter Image Path:')) {
		const image = images.pop();
		if (image === undefined) {
			darknet.kill();
		}
		darknet.stdin.write(`data/${image}\n`);
	}
});