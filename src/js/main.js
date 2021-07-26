async function getData(fileName) {
  try {
    const response = await fetch(`/src/data/${fileName}`);
    const responseJson = await response.json();
    if (responseJson) {
      return Promise.resolve(responseJson.data);
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