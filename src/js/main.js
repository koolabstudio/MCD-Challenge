async function loopFiles() {
  try {
    let data = [];
    for (let index = 1; index < 15; index++) {
      try {
        const response = await fetch(`/src/data/user-${index}.json`);
        const responseJson = await response.json();
        if (responseJson) {
          data.push(responseJson.data[0]);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(console.log(`File not found. Error: ${error}`));
  }
}

async function getData(fileName) {
  try {
    const response = await loopFiles();
    if (response) {
      return Promise.resolve(response);
    } else {
      return Promise.reject('Data not found');
    }
  } catch (error) {
    return Promise.reject(console.log(`Data not found. Error: ${error}`));
  }
}

async function renderDataList(fileName, targetElement) {
  try {
    const data = await getData(fileName);
    if (data) {
      data.forEach((item, index) => {
        const el = document.getElementById(targetElement);
        el.innerHTML = `
          <li>
            <article>
              <h3>
                ${item.name}
              </h3>
              <div>
                GitHub profile:
                <a
                  href="https://github.com/${item.githubUsername}"
                  target="_blank"
                >
                  @${item.githubUsername}
                </a>
              </div>
              <div>
                Slicing result:
                <a
                  href="${item.slicingUrl}"
                  target="_blank"
                >
                  ${item.slicingUrl}
                </a>
              </div>
            </article>
          </li>
        ` + el.innerHTML;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

renderDataList('c-git.json', 'challenge1__list');