using UnityEngine;
using System.Collections;

public class PropRotateLock : MonoBehaviour {
	public bool active;
	public Vector3 offset;
	public float speed;
	private Quaternion target;

	// Use this for initialization
	void Start () {
		target = Quaternion.Euler(transform.localRotation.eulerAngles + offset);
	}
	
	public void LockTrigger(){
		active = !active;
	}
	
	// Update is called once per frame
	void Update () {
		if(active){
			transform.localRotation = Quaternion.Lerp(transform.localRotation, target, speed);
		}
	}
}