using UnityEngine;
using System.Collections;

public class PropRotateLock : MonoBehaviour {
	public bool active;
	public Vector3 offset;
	public float speed;
	public bool isinit; 

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

	public void LockTrigger(bool status) {
		active = status;
	}
	
	// Update is called once per frame
	void Update () {
		if(active){
			transform.localRotation = Quaternion.Lerp(transform.localRotation, target, speed);
			// print("LocalRotation: " + target.eulerAngles);
		}
	}
}