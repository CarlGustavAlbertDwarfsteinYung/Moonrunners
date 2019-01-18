(function () {
    // Canvas properties
    var canvas = document.getElementById("canvas");
    var stage;
    // Asset manager
    var assetManager;
    var assetManifest;
    // 
    var currentScene;
    // Display properties
    var displayWidth = 1920;
    var displayHeight = 1080;
    // Title label and properties    
    var titleLabel;
    var continueLabel;
    // Game Background
    var gameBackground;
    // Load assets
    assetManifest = [
        { id: "background", src: "./Assets/images/bg.jpg" }
    ];
    // Preload the required assets
    function Init() {
        // Debug message
        console.log("Initialization started");
        // Create the asset manager and preload stuff
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }
    // Setup the game objects
    function Start() {
        // Debug message
        console.log("Starting application...");
        // Create the main stage
        stage = new createjs.Stage(canvas);
        // Set framerate properties
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        // Set the stage size
        stage.setBounds(0, 0, displayWidth, displayHeight);
        // Create the background image
        gameBackground = new createjs.Bitmap(assetManager.getResult("background"));
        stage.addChild(gameBackground);
        // Set the properities of the animated Title label
        titleLabel = new objects.Label("Moonrunners", "80px", "Consolas", "#fff", stage.getBounds().width / 2, stage.getBounds().height / 2);
        titleLabel.setScale(0.5);
        titleLabel.textAlign = "center";
        titleLabel.alpha = 0;
        stage.addChild(titleLabel);
        // Set the properities of the animated Title label
        continueLabel = new objects.Label("Click anywhere to continue", "20px", "Consolas", "#fff", stage.getBounds().width / 2, stage.getBounds().height / 2 + 100);
        continueLabel.alpha = 0;
        continueLabel.textAlign = "center";
        stage.addChild(continueLabel);
        currentScene = config.Scene.START;
        Main();
    }
    function Update() {
        stage.update();
    }
    function Main() {
        switch (currentScene) {
            case config.Scene.START:
                break;
            case config.Scene.PLAY:
                break;
            case config.Scene.OVER:
                break;
        }
        console.log("Game started");
        // Start title animation chain
        createjs.Tween.get(titleLabel).wait(500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.getPowOut(1)).call(showClickToContinueLabel);
    }
    function showClickToContinueLabel() {
        createjs.Tween.get(continueLabel).to({ alpha: 1 }, 1500, createjs.Ease.getPowOut(1)).call(function () {
            gameBackground.on("click", startGame);
        });
    }
    function startGame() {
        gameBackground.off("click", startGame);
        createjs.Tween.get(titleLabel).to({ y: 50 }, 1500, createjs.Ease.getPowOut(1));
        createjs.Tween.get(continueLabel).to({ alpha: 0 }, 500, createjs.Ease.getPowOut(1));
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map