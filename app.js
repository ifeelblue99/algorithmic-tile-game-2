document.addEventListener("DOMContentLoaded", () => {

    //DOM elements
    const grid = document.getElementById("grid")
    const gameBody = document.getElementById("body")
    const restartButton = document.getElementById("res-btn")
    const gameEndScreen = document.getElementById("game-end-screen")
    // tile stuff
    const gameTiles = []
    const TILE_COUNT = 200
    // computer
    const computerInvadedTiles = new Set()
    let yellowTileLocation = 0
    // user
    const userInvadedTiles = new Set()

    function createBoard() {
        for (let index = 0; index < TILE_COUNT; index++) {
            const tile = document.createElement("div")
            tile.id = index
            tile.classList.add("tile")
            grid.appendChild(tile)
            gameTiles.push(tile)
        }
    }
    createBoard()
    
    function setTilesForGame() {
        let allTheGameTiles = document.querySelectorAll(".tile")
        allTheGameTiles.forEach(el => {
            el.addEventListener("click", handleUserInvadeTile)
        })
    }
    setTilesForGame()

    function validMovesForYellowTile(loc) {
        if (window.innerWidth > 700) {
            return moves = [loc - 1, parseInt(loc) + 1, parseInt(loc) + 20, loc - 20, parseInt(loc) + 180, loc - 180]
        }
        return moves = [loc - 1, parseInt(loc) + 1, parseInt(loc) + 6, loc - 6]
    }

    function setInitialPositionOfYellowTile() {
        const randNumber = Math.floor(Math.random() * gameTiles.length)
        yellowTileLocation = gameTiles[randNumber].id
        gameTiles[yellowTileLocation].style.backgroundColor = "yellow"
        computerInvadedTiles.add(yellowTileLocation)
    }
    setInitialPositionOfYellowTile()

    function moveYellowTile() {
        const movableTileIndexes = validMovesForYellowTile(yellowTileLocation)
            .filter(indx => indx >= 0 && indx <= 199)
            .filter(validIndx => {
                if (gameTiles[validIndx].style.backgroundColor === "white" ||
                    gameTiles[validIndx].style.backgroundColor === "yellowgreen") {
                    return false
                }
                return true
            })
        if (movableTileIndexes.length === 0) {
            endGame()
            return
        }
        const randomIndex = Math.floor(Math.random() * movableTileIndexes.length)
        const selectedTileIndex = movableTileIndexes[randomIndex]
        gameTiles[selectedTileIndex].style.backgroundColor = "yellow"
        computerInvadedTiles.add(yellowTileLocation)
        invadeTile(computerInvadedTiles)
        yellowTileLocation = selectedTileIndex
    }

    function invadeTile(arr) {
        arr.forEach(loc => {
            gameTiles[loc].style.backgroundColor = "yellowgreen"
        })
    }

    function endGame() {
        gameBody.style.overflow = "hidden"
        setTimeout(() => {
            gameEndScreen.style.visibility = "visible"
            window.scrollTo(0, 0)
        }, 800);
    }


    function handleUserInvadeTile(element) {
        if (computerInvadedTiles.has(element.target.id)) return
        this.style.backgroundColor = "white"
        userInvadedTiles.add(element.target.id)
        moveYellowTile()
    }

    function restartGame() {
        gameTiles.length = 0
        yellowTileLocation = 0

        computerInvadedTiles.clear()
        userInvadedTiles.clear()

        grid.innerHTML = ""

        createBoard()
        setTilesForGame()
        setInitialPositionOfYellowTile()

        gameBody.style.overflow = "auto"
        gameEndScreen.style.visibility = "hidden"
    }
    restartButton.addEventListener("click", restartGame)
})
