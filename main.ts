import java.util.Random;

public class WordSearchQuest {
    private char[][] grid;
    private String[] words;
    private int gridSize;
    private Random random;

    public WordSearchQuest(int gridSize, String[] words) {
        this.gridSize = gridSize;
        this.words = words;
        this.grid = new char[gridSize][gridSize];
        this.random = new Random();
    }

    public void generateGrid() {
        // Fill the grid with random letters
        for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize; j++) {
                grid[i][j] = getRandomLetter();
            }
        }

        // Place the words in the grid
        for (String word : words) {
            placeWord(word);
        }
    }

    private void placeWord(String word) {
        int length = word.length();
        boolean placed = false;

        while (!placed) {
            int row = random.nextInt(gridSize);
            int col = random.nextInt(gridSize);
            int direction = random.nextInt(8); // 8 possible directions (horizontal, vertical, diagonal)

            // Check if the word can fit in the chosen starting position and direction
            if (checkAvailability(row, col, length, direction)) {
                // Place the word in the grid
                for (int i = 0; i < length; i++) {
                    switch (direction) {
                        case 0:
                            grid[row][col + i] = word.charAt(i);
                            break;
                        case 1:
                            grid[row + i][col] = word.charAt(i);
                            break;
                        case 2:
                            grid[row + i][col + i] = word.charAt(i);
                            break;
                        case 3:
                            grid[row + i][col - i] = word.charAt(i);
                            break;
                        case 4:
                            grid[row - i][col] = word.charAt(i);
                            break;
                        case 5:
                            grid[row][col - i] = word.charAt(i);
                            break;
                        case 6:
                            grid[row - i][col - i] = word.charAt(i);
                            break;
                        case 7:
                            grid[row - i][col + i] = word.charAt(i);
                            break;
                    }
                }

                placed = true;
            }
        }
    }

    private boolean checkAvailability(int row, int col, int length, int direction) {
        switch (direction) {
            case 0: // Horizontal right
                if (col + length <= gridSize) {
                    for (int i = 0; i < length; i++) {
                        if (grid[row][col + i] != '\0') {
                            return false; // Word intersects with another word
                        }
                    }
                    return true;
                }
                break;
            case 1: // Vertical down
                if (row + length <= gridSize) {
                    for (int i = 0; i < length; i++) {
                        if (grid[row + i][col] != '\0') {
                            return false; // Word intersects with another word
                        }
                    }
                    return true;
                }
                break;
            // Implement the other directions similarly
            // ...
        }
        return false;
    }

    private char getRandomLetter() {
        // Returns a random uppercase letter
        return (char) (random.nextInt(26) + 'A');
    }

    public void printGrid() {
        for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize;

