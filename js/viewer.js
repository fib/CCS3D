
window.onload = function () {
        document.body.addEventListener('dragover', onDragOver);
        document.body.addEventListener('drop', onDrop);
    }

    function onDragOver(e) {

        // stop browser processing right away
        e.stopPropagation();
        e.preventDefault();

    };

    function onDrop(e) {

        e.stopPropagation();
        e.preventDefault();


        imageIds = [];

        for (var i = 0; i < e.dataTransfer.files.length; i++) {

            var f = e.dataTransfer.files[i];
            imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(f));
        }

        const renderingEngineId = 'r';
        const renderingEngine = new cornerstone3dCore.RenderingEngine(renderingEngineId);

        const viewportId = 'viewer';

        var element = document.getElementById('viewer');

        const viewportInput = {
            viewportId,
            element,
            type: cornerstone3dCore.Enums.ViewportType.STACK,
        };



        renderingEngine.enableElement(viewportInput);

        load_volume();

    }

    async function run() {
        await cornerstone3dCore.init();
    }

    async function load_volume() {


        // TODO
        volume = await cornerstone3dCore.volumeLoader.createAndCacheVolume(volumeId, {
            imageIds,
        });

        volume.load();

    }
    
    run();
