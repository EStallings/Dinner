using UnityEngine;
using System.Collections;

public class PropWaggler : MonoBehaviour {
	public Vector3 offset;
	public float speed;
	private Vector3 start;
	private Vector3 end;
	private Vector3 current;
	public bool activestate;
	private bool direction;

	// Use this for initialization
	void Start () {
		direction = false;
		start = transform.localRotation.eulerAngles;
		end = transform.localRotation.eulerAngles + offset;

	
	}

	void WaggleTrigger(){
		activestate = !activestate;
	}
	
	// Update is called once per frame
	void Update () {
		if(activestate){
			current = transform.localRotation.eulerAngles;
			transform.localRotation = Quaternion.Euler(start + offset * Mathf.Sin(Time.timeSinceLevelLoad*speed));
		}
	}
}
