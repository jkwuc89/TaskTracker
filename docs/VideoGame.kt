// val creates getter only, var creates getter and setter
data class VideoGame(val name: String, val publisher: String, var reviewScore: Int)


// Other Kotlin tidbits
fun main(args : Array<String>) {
    // Supports property access
    val aVideoGame = VideoGame("Call of Duy", "Activision", 90)
    println("Video game name = ${aVideoGame.name}") // String interpolation - neat!

    // Named function arguments
    val anotherVideoGame: VideoGame(publisher = "Microsoft", name = "Halo", reviewScore = 95)

    // Supports deconstructing properties as follows:
    val listOfGame: List<VideoGame> = listOf(game, betterGame)
    for ((gameName, gamePublisher, gameScore) in listOfGame) {
        // Do something with the individual properties
    }

    // Other interesting Kotlin tidbits

    // Type inference:
    val aString = "String" // inferred as String

    // Nullable, only references personalInfo if client not null and email if
    // client.personalInfo is not null
    val email = client?.personalInfo?.email
}

