window.addEventListener('load', function() {
    fetch('https://handlers.education.launchcode.org/static/astronauts.json').then(function(response) {
        response.json().then(function(json) {
            let container = document.getElementById('container');
            let index = 0;
            let astronautsSorted = json.sort(function(b, a) {
                return a.hoursInSpace - b.hoursInSpace;
            })

            let reference = document.getElementsByTagName('h1')[0];
            let astronautCountElem = document.createElement('p');
            astronautCountElem.innerHTML = `<p>Number of astronauts: ${astronautsSorted.length}</p>`
            reference.insertAdjacentElement('afterend', astronautCountElem);

            for (astronaut of astronautsSorted) {
                let skills = astronaut.skills.join(', ');
                
                container.innerHTML += `
                <div class="astronaut">
                    <div class="bio">
                        <h3>${astronaut.firstName} ${astronaut.lastName}</h3>
                        <ul>
                            <li>Hours in space: ${astronaut.hoursInSpace}</li>
                            <li>Active: ${astronaut.active}</li>
                            <li>Skills: ${skills}</li>
                        </ul>
                    </div>
                    <img class="avatar" src=${astronaut.picture}>
                </div>
                `;

                let activeText = document.querySelectorAll('ul > li:nth-child(2)')[index];
                if (astronaut.active === true) {
                    activeText.classList.add('active');
                }
                index++;
            }
        })
    })
})