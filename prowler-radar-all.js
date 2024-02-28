!function() {
  function Gt(Zt) {
    if (zt) {
      let Qt = Wt[Zt.id];
      Qt || (Qt = new PIXI.Graphics,
        Qt.clear(),
        Qt.beginFill(16711680, .125),
        Qt.drawCircle(0, 0, Vt),
        Qt.endFill(),
        Wt[Zt.id] = Qt,
        game.graphics.layers.groundobjects.addChild(Qt)),
        Qt.position.set(Zt.lowResPos.x, Zt.lowResPos.y),
        Qt.renderable = Zt.removedFromMap || 2 != game.myType && 3 != game.myType && 5 != game.myType || 5 != Zt.type || Zt.team == Players.getMe().team || Zt.hidden || Zt.render && !Zt.stealthed ? !1 : !0
    }
  }
  function Xt() {
    var Zt = Players.getIDs()
      , Qt = Players.getMe();
    if (Kt.hide(),
      !!zt)
      for (var Jt in Zt) {
        var $t = Players.get(Jt);
        if ((2 == game.myType || 3 == game.myType || 5 == game.myType) && 5 == $t.type && $t.team != Qt.team) {
          var en = Tools.distance($t.lowResPos.x, $t.lowResPos.y, Qt.pos.x, Qt.pos.y);
          en < Vt && Kt.show()
        }
        Gt($t, Qt)
      }
  }
  function Ht() {
    for (let Zt in Wt)
      jt(Zt)
  }
  function jt(Zt) {
    let Qt = Wt[Zt];
    Qt && (game.graphics.layers.groundobjects.removeChild(Qt),
      Qt.destroy(),
      delete Wt[Zt])
  }
  let Wt = {}
    , zt = !0
    , Vt = 600
    , qt = 0
    , Kt = $("<div id='prowlerAlert' style='position: absolute; top: 100px; left: calc(50% - 50px); width: 100px; height: 30px; background-color: red; opacity:0.6;display:none;'></div>");
  this.updateSettings = function() {
    "undefined" != typeof SWAM.Settings.general.useProwlerRadar && (zt = SWAM.Settings.general.useProwlerRadar,
    !zt && (Kt.hide(),
      Ht()))
  }
    ,
    SWAM.on("settingsApplied", this.updateSettings.bind(this)),
    SWAM.on("playerChangedType", Zt=>{
        Gt(Players.get(Zt.id))
      }
    ),
    SWAM.on("playerKilled", (Zt,Qt)=>{
        Gt(Qt)
      }
    ),
    SWAM.on("playerStealth", Zt=>{
        let Qt = Players.get(Zt.id);
        Gt(Qt)
      }
    ),
    SWAM.on("playerDestroyed", Zt=>{
        jt(Zt.id)
      }
    ),
    SWAM.on("gamePrep", ()=>{
        $("body").append(Kt),
          qt = setInterval(Xt, 500)
      }
    ),
    SWAM.on("gameWipe", ()=>{
        Ht(),
          Kt.remove(),
          qt = clearInterval(qt)
      }
    )

  SWAM.registerExtension({
      name: "All Ships Prowler Radar",
      id: "all-ships-prowler-radar",
      description: "Add prowler radar to all ships, enabled according to Starmash's prowler radar settings",
      author: "Debug",
      version: "1.0"
  });

}();


