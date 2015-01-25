using UnityEngine;
using System.Collections;

public class PropWaggler : MonoBehaviour {
	public Vector3 offset;
	public float speed;
	private Vector3 start;
	private Vector3 current;
	private Quaternion currentquat;
	public bool activestate;
	private bool direction;
	private float e;

	// Use this for initialization
	void Start () {
		direction = false;
		start = transform.localRotation.eulerAngles;
	}

	public void WaggleTrigger(bool status){
		if (activestate == status){
			return;
		}
		activestate = status;
		direction = false;
		start = transform.localRotation.eulerAngles;
		e = Random.value * 2000;
	}
	private void PUpdate(){
		if(activestate){
			current = transform.localRotation.eulerAngles;
			currentquat = Quaternion.Euler(transform.localRotation.eulerAngles - offset * Mathf.Sin((Time.timeSinceLevelLoad - Time.deltaTime)*speed));
			transform.localRotation = Quaternion.Euler(start + offset * Mathf.Sin(Time.timeSinceLevelLoad*speed));
		}
	}
	// Update is called once per frame
	void Update () {
		PUpdate();
	}
}
