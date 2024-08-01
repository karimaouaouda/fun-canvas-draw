window.onload = function(){
    var c, w, h, ctx;

    c = document.getElementById('cnvs')

    ctx = c.getContext("2d")

    w = window.innerWidth
    h = window.innerHeight

    c.width = c.innerWidth = w;
    c.height = c.innerHeight = h


    let boundingRect = c.getBoundingClientRect();

    let widthMiddle = boundingRect.width / 2
    let heightMiddle = boundingRect.height / 2

    let screens = [
        {
            x : 0,
            y : 0,
            w : widthMiddle,
            h : heightMiddle
        },
        {
            x : widthMiddle,
            y : 0,
            w : widthMiddle,
            h : heightMiddle
        },
        {
            x : 0,
            y : heightMiddle,
            w : widthMiddle,
            h : heightMiddle
        },
        {
            x : widthMiddle,
            y : heightMiddle,
            w : widthMiddle,
            h : heightMiddle
        }
    ]


    function fillScreen(screennumber, color){
        ctx.fillStyle = color

        ctx.fillRect(screens[screennumber - 1].x, screens[screennumber - 1].y, screens[screennumber - 1].w, screens[screennumber - 1].h)

        ctx.fillStyle = "#000"
    }


    function detectScreen(position){
        if(position.x >=widthMiddle ){
            if(position.y >= heightMiddle){
                return 4
            }else{
                return 2
            }
        }else{
            if(position.y >= heightMiddle){
                return 3
            }else{
                return 1
            }
        }
    }

    function adjustePositionToScreen(__screen, generalX, generalY){
        let pos = {
            x : -1,
            y : -1
        }



        pos.x = generalX - __screen.x
        pos.y = generalY - __screen.y

        return pos
    }

    


    c.addEventListener('mousemove', function(mouse){
        let currentScreen = detectScreen({
            x : mouse.clientX,
            y : mouse.clientY
        })


        currentScreen = screens[currentScreen - 1]

        let positionInScreen = adjustePositionToScreen(currentScreen, mouse.clientX, mouse.clientY)

        ctx.fillRect(mouse.clientX, mouse.clientY, 5, 5)

        if( mouse.clientX > widthMiddle ){

            ctx.fillRect( widthMiddle - positionInScreen.x , mouse.clientY, 5, 5)

            if(mouse.clientY > heightMiddle){
                ctx.fillRect(
                    widthMiddle - positionInScreen.x,
                    heightMiddle - positionInScreen.y,
                    5,
                    5
                )
            }else{
                ctx.fillRect(
                    widthMiddle - positionInScreen.x,
                    heightMiddle * 2 - positionInScreen.y,
                    5,
                    5
                )
            }

        }else{
            ctx.fillRect(widthMiddle * 2 - positionInScreen.x, mouse.clientY, 5, 5)

            if(mouse.clientY > heightMiddle){
                ctx.fillRect(
                    widthMiddle * 2 - positionInScreen.x,
                    heightMiddle - positionInScreen.y,
                    5,
                    5
                )
            }else{
                ctx.fillRect(
                    widthMiddle * 2 - positionInScreen.x,
                    heightMiddle * 2 - positionInScreen.y,
                    5,
                    5
                )
            }
        }
        
        if(mouse.clientY > heightMiddle){
            ctx.fillRect(mouse.clientX, heightMiddle - positionInScreen.y, 5, 5)
        }else{
            ctx.fillRect(mouse.clientX, heightMiddle * 2 - positionInScreen.y, 5, 5)
        }



    })


}