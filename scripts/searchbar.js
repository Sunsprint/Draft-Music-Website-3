const pages = [
    { name: 'home', subtitles: ['olin music', 'events', 'mission statement'] },
    { name: 'groups', subtitles: ['group directory', +
        'olin conductorless orchestra', 'olin jazz orchestra', +
        'olin rock orchestra', 'powerchords'] },
    { name: 'gallery', subtitles: ['gallery'] },
    { name: 'resources', subtitles: ['resources', 'faculty', 'events', +
        'academics'] },
    { name: 'academics', subtitles: ['academics', 'classes', +
        'cross registration', 'extracurriculars', 'facilities'] },
    { name: 'contact', subtitles: ['contact us', 'ready to talk?'] },
    { name: 'events', subtitles: ['events', 'event', 'performance', +
        'showcase'] },
    { name: 'faculty', subtitles: ['faculty','staff'],
        people: ['jeffrey brown', 'ann richmond', 'alex greenfield'] }
]

const list = document.getElementById('list');

function setList(group) {
    clearList();
    for (const page of group) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode(page.name);
        item.appendChild(text);
        list.appendChild(item);
    }

    if (group.length === 0) {
        setNoResults();
    }
}

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}

function setNoResults() {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        return 0;
    }
}
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(pages.filter(page => {
            return page.name.includes(value)
        }).sort((pageA, pageB) => {
            return getRelevancy(pageB.name, value) - getRelevancy(pageA.name, value);
        }));
    } else {
        clearList();
    }
});