#pragma strict

var controller : GameStatusController;

var waypoints : Transform[];
var times : int[];
var anims : int[]; //todo: make this some kind of asset type
var sounds : int[];
var triggers : int[];

var walkAnim = null;
var walkSound = null;

private var isCarryingObject = false;
private var isWalking        = false;
private var curTimer         = -1;
private var curWaypoint : Transform     = null;
private var lastWaypoint : Transform    = null;
private var curIndex         = 0;

var speed = 0.1;
private var startTime: float;
private var journeyLength: float;

var target : Transform;
var smooth = 5.0;

function Start () {
	curWaypoint = waypoints[0];
	curTimer = times[0];
	print(transform.position);
	StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
}

function StartAnimAndSoundLoops(anim, sound) {
	print("Starting anim and sound on loop!");
}

function Update () {
	if (isWalking){
		MoveTowardsWaypoint(curWaypoint);
	}
	else {
		if(curTimer > 0) curTimer --;
		if(curTimer == 0) {
			print("Progressing");
			if(triggers[curIndex] != 0){
				controller.DoTriggerAction(triggers[curIndex]);
			}
			curIndex ++;
			lastWaypoint = curWaypoint;
			curWaypoint = waypoints[curIndex];
			curTimer = times[curIndex];
			StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
			if(!IsCloseToDestination()){
				isWalking = true;
				StartAnimAndSoundLoops(walkAnim, walkSound);
				startTime = Time.time;
				journeyLength = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
			}
		}
	}
}

function IsCloseToDestination() {
	var distance = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
	print("Distance = " + distance);
	if(distance > 1.5) return false;
	return true;
}

function MoveTowardsWaypoint(waypoint) {
	var distCovered = (Time.time - startTime) * speed;
	var fracJourney = distCovered / journeyLength;
	// print("FracJourney " + fracJourney);
  transform.position = Vector3.Lerp(lastWaypoint.position, curWaypoint.position, fracJourney);
  if (fracJourney >= 1){
  	isWalking = false;
  	print("Stopping");
  }
}