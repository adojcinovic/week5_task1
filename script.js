const body = document.querySelector('body')

const toggleSwitch = document.querySelector('#switch')
const search = document.querySelector('#button')
const noResults = document.querySelector('.no-result')
const theme = document.querySelector('#moon-light')

const inputSearch = document.querySelector('#input-search')
const name = document.querySelector('#name')
const login = document.querySelector('#login')
const avatar = document.querySelector('#avatar')
const bio = document.querySelector('#bio')
const joiningDate = document.querySelector('.joining-date')
const repos = document.querySelector('#repos')
const followers = document.querySelector('#followers')
const following = document.querySelector('#following')
const city = document.querySelector('#location')
const company = document.querySelector('#company')
const twitter_username = document.querySelector('#twitter_username')
const html_url = document.querySelector('#html_url')



theme.addEventListener('click', () => {
    body.classList.toggle('dark')
    if (toggleSwitch.value === 'DARK') {
        toggleSwitch.value = 'LIGHT'
    } else {
        toggleSwitch.value = 'DARK';
    }
    toggleSwitch.classList.toggle('toggle-dark')
    if (theme.getAttribute('src') === './assets/icon-moon.svg') {
        theme.setAttribute('src', './assets/icon-sun.svg')
    } else {
        theme.setAttribute('src', './assets/icon-moon.svg')
    }
})


search.addEventListener('click', () => {
    fetch(`https://api.github.com/users/${inputSearch.value}`)
        .then((response) => {
            if (!response.ok) {
                noResults.classList.remove('no-result')
                noResults.classList.add('visible')
                return null
            } else {
                noResults.classList.remove('visible')
                noResults.classList.add('no-result')
                return response.json()
            }
        }).then((data) => {
            data.name ? name.innerHTML = data.name : name.innerHTML = data.login
            login.innerHTML = '@' + data.login
            avatar.setAttribute('src', `${data.avatar_url}`)
            data.bio ? bio.innerHTML = data.bio : bio.innerHTML = 'This profile has no bio.'
            joiningDate.innerHTML = 'Joined' + new Date(data.created_at).toString().slice(3, 15)
            repos.innerHTML = data.public_repos
            followers.innerHTML = data.followers
            following.innerHTML = data.following
            if (data.location) {
                city.innerHTML = data.location
                city.classList.remove('opacity')
            }
            else {
                city.innerHTML = 'Not available'
                city.classList.add('opacity')
            }
            if (data.twitter_username) {
                twitter_username.innerHTML = data.twitter_username
                twitter_username.classList.remove('opacity')
            } else {
                twitter_username.innerHTML = 'Not available'
                twitter_username.classList.add('opacity')
            }
            if (data.company) {
                company.innerHTML = data.company
                company.classList.remove('opacity')
            } else {
                company.innerHTML = 'Not available'
                company.classList.add('opacity')
            }
            html_url.innerHTML = data.html_url
            html_url.addEventListener('click', () => {
                window.open(html_url.innerHTML)
            })
        })
        .catch(error => console.log(error))
})
