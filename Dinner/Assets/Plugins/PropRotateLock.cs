using UnityEngine;
using System.Collections;

public class PropRotateLock : MonoBehaviour {
	public bool active;
	public bool isinit; 
	public Vector3 offset;
	public float speed;
	private Quaternion target;

	// Use this for initialization
	void Start () {

	}

	public void init() {
		if(!isinit){
			target = Quaternion.Euler(transform.localRotation.eulerAngles + offset);
			isinit = true;
		}
	}

	public void LockTrigger(){
		active = !active;
	}
	
	// Update is called once per frame
	void Update () {
		if(active){
			transform.localRotation = Quaternion.Lerp(transform.localRotation, target, speed);
			print("LocalRotation: " + target.eulerAngles);
		}
	}
}