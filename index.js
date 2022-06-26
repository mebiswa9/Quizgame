const url = 'first.json';
const output = document.querySelector('.output');
const game = { question: 0, total: 0, data: [], score: 0 };

document.addEventListener('DOMContentLoaded', init);

function init() {
	output.innerHTML = '';
	const btn = document.createElement('button');
	btn.disabled = true;

	start(btn);

	game.question = 0;
	game.total = 0;
	game.score = 0;
	game.data = [];

	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			game.total = data.length;
			game.data = data;

			btn.disabled = false;
		});
}

function start(btn) {
	const html = `  Welcome to the Quiz press the button below to start the quiz.<br> | < | Total 50 Gk related Question | > |  <br> Are You Ready For This Challange ? `;
	const div = maker('div', html, 'box', output);
	// div.classList.add('m-5');
	// div.classList.add('text-center');

	output.append(div);

	btn.textContent = 'Start Game';
	btn.classList.add('btn');

	div.append(btn);

	btn.addEventListener('click', loadQuestion);
}

function loadQuestion() {
	output.innerHTML = '';
	if (game.question >= game.total) {
		const html = `<h1>Game Over</h1> <div>You Got ${game.score} out of ${game.total} Correct.</div>`;
		const div = maker('div', html, 'box', output);
		const btn3 = maker('button', 'Play Again', 'btn', div);
		btn3.classList.add('btn-sm');
		btn3.classList.add('btn-outline-primary');
		btn3.addEventListener('click', init);
	} else {
		const div = maker('div', '', 'box', output);
		const val = game.data[game.question];

		const question = maker('div', `${val.q}`, 'box', div);
		question.classList.add('mt-5');
		question.classList.add('myclass');

		const optList = maker('div', '', 'box', div);

		val.arr.forEach((opt) => {
			const temp = maker('div', opt, 'box', optList);
			temp.classList.add('box2');
			temp.myObj = {
				opt: opt,
				answer: val.ans,
			};
			temp.addEventListener('click', chacker);
		});
	}
}
function chacker(e) {
	const val = e.target.myObj;

	removeClicks();

	e.target.style.color = 'white';
	let html = '';
	if (val.opt == val.answer) {
		game.score++;
		e.target.style.backgroundColor = 'green';
		html = `Correct!`;
	} else {
		e.target.style.backgroundColor = '#b82665';
		html = `Wrong!`;
	}
	const parent = e.target.parentElement;

	game.question++;

	const rep = game.question == game.total ? 'End Game' : 'Next Question';

	const feedback = maker('div', html, 'box3', parent);

	const btn2 = maker('button', rep, 'btn', parent);

	btn2.addEventListener('click', loadQuestion);
}

function removeClicks() {
	const boxes = document.querySelectorAll('.box');
	boxes.forEach((ele) => {
		ele.removeEventListener('click', chacker);
		ele.style.color = '#ddd';
		ele.classList.remove('box2');
	});
}

function maker(eleType, html, cla, parent) {
	const ele = document.createElement(eleType);
	ele.innerHTML = html;
	ele.classList.add(cla);
	return parent.appendChild(ele);
}
