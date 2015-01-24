using UnityEngine;
using System.Collections;

public class NPCSelector : MonoBehaviour {


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		RaycastHit hit;
		if (Physics.Raycast(transform.position, transform.forward, out hit, 100)){
			if (hit.collider.tag == "AI"){
				print ("Trigger something here");
			}
		}
	
	}
}
