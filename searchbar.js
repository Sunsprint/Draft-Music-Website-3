const pages = [
    { name: 'home', href:'Home.html', subtitles: ['olin music', 'events', 'mission statement'],
        people:'' },
    { name: 'groups', href:'Groups.html', subtitles: ['group directory', +
        'olin conductorless orchestra', 'olin jazz orchestra', +
        'olin rock orchestra', 'powerchords'], people:'' },
    { name: 'gallery', href:'Gallery.html', subtitles: ['gallery'], people:'' },
    { name: 'resources', subtitles: ['resources', 'faculty', 'events', +
        'academics'], people:'' },
    { name: 'academics', href:'Academics.html', subtitles: ['academics', 'classes', +
        'cross registration', 'extracurriculars', 'facilities'], people:'' },
    { name: 'contact', href:'Contact.html', subtitles: ['contact us', 'ready to talk?'], people:'' },
    { name: 'events', subtitles: ['events', 'event', 'performance', +
        'showcase'], people:'' },
    { name: 'faculty', href:'Faculty.html', subtitles: ['faculty','staff'],
        people: ['jeffrey brown', 'ann richmond', 'alex greenfield'] }
]

const list = document.getElementById('list');

function setList(group) {
    clearList();
    if (group.length === 0) {
        setNoResults();
    } else {
        const htmlString = group.map((element) => {
            return `<li><a href="${element.href}" class="u-search-result"><h4 class="title">${element.name}</h4></a></li>`
        }).join('\n');
        list.innerHTML = htmlString
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

searchInput.addEventListener('keyup', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(pages.filter(page => {
            return page.name.includes(value) //|| page.subtitles.includes(value) || page.people.includes(value)
        }).sort((pageA, pageB) => {
            return getRelevancy(pageB.name, value) - getRelevancy(pageA.name, value);
        }));
    } else {
        clearList();
    }
});