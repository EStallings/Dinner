#pragma strict

var controller : GameStatusController;

var waypoints : Transform[];
var times : int[];
var anims : int[]; //todo: make this some kind of asset type
var sounds : AudioClip[];
var triggers : int[];

var walkAnim = null;
var walkSound = null;

private var isCarryingObject : boolean   = false;
private var isWalking        : boolean   = false;
private var curTimer         : int       = -1;
private var curWaypoint      : Transform = null;
private var lastWaypoint     : Transform = null;
private var curIndex         : int       = 0;
private var curAnimation = null;
private var curSound : AudioClip = null;
var speed = 0.1;
private var startTime: float;
private var journeyLength: float;

var target : Transform;
var smooth = 5.0;

private var asource : AudioSource;

function Start () {
	asource = gameObject.AddComponent("AudioSource");
	asource.loop = true; //just, always loop everything
	curWaypoint = waypoints[0];
	curTimer = times[0];
	print(transform.position);
	StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
}

function StartAnimAndSoundLoops(anim, sound) {
	print("Starting anim and sound on loop!");
	//End current animations and sounds
	if(curAnimation != null){
		//End animation
	}
	if(curSound != null){
		//End sound
		asource.Stop();
		print("Stopping : " + curSound);
	}
	curAnimation = anim;
	curSound = sound;
	//Start current animations and sounds
	if(curAnimation != null){
		//Start animation
	}
	if(curSound != null){
		//Start sound
		asource.clip = curSound;
		asource.Play();
		print("Playing : " + curSound);
	}
}

function Update () {
	if (isWalking){
		MoveTowardsWaypoint(curWaypoint);
	}
	else {
		if(curTimer > 0) curTimer --;
		if(curTimer == 0) {
			print("Progressing : " + (curIndex + 1));
			if(triggers[curIndex] != 0){
				controller.DoTriggerAction(triggers[curIndex]);
			}
			curIndex ++;
			lastWaypoint = curWaypoint;
			curWaypoint = waypoints[curIndex];
			
			if(!IsCloseToDestination()){
				isWalking = true;
				StartAnimAndSoundLoops(walkAnim, walkSound);
				startTime = Time.time;
				journeyLength = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
			}
			else {
				curTimer = times[curIndex];
				StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
			}
			
			
		}
	}
}

function IsCloseToDestination() {
	var distance = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
	//print("Distance = " + distance);
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
  	curTimer = times[curIndex];
	StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
  	//print("Stopping");
  }
}