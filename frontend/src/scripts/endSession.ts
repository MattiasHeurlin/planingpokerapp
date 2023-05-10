import { socket } from './main';
import { Room, getAllRooms } from './roomSelection';

export function endSession() {
  socket.emit('endSession', socket.id);
}

export function renderEndSessionPage(room: Room) {
  const main = document.querySelector<HTMLDivElement>('.main-content');
  main!.innerHTML = '';

  const heading = document.createElement('h1');
  heading.innerHTML = 'Planning Poker rundan är avslutad.';

  const backBtn = document.createElement('button');
  backBtn.innerHTML = 'Tillbaka till rum-val';
  backBtn.addEventListener('click', getAllRooms);

  const topicsTable = document.createElement('table');
  const tableHead = document.createElement('th');
  const tableHeadRow = document.createElement('tr');
  const tableHeadTopic = document.createElement('td');
  tableHeadTopic.innerHTML = 'Titel';
  const tableHeadScore = document.createElement('td');
  tableHeadScore.innerHTML = 'Poäng';

  tableHeadRow.append(tableHeadTopic, tableHeadScore);
  tableHead.appendChild(tableHeadRow);

  const tableBody = document.createElement('tb');

  room.previousTopics.map((topic) => {
    const tableBodyRow = document.createElement('tr');
    const topicTitle = document.createElement('td');
    topicTitle.innerHTML = topic.title || '';
    const topicScore = document.createElement('td');
    topic.score
      ? (topicScore.innerHTML = topic.score.toString())
      : (topicScore.innerHTML = 'Ofullständig röstning');

    tableBodyRow.append(topicTitle, topicScore);
    tableBody.appendChild(tableBodyRow);
  });

  topicsTable.append(tableHead, tableBody);
  main?.append(heading, topicsTable, backBtn);
}
