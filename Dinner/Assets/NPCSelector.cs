using UnityEngine;
using System.Collections;

public class NPCSelector : MonoBehaviour {
	NodListener myself;
	public GameObject alert;

	// Use this for initialization
	void Start () {
		myself = GetComponent<NodListener>();
	}
	
	// Update is called once per frame
	void Update () {

		RaycastHit hit;
		if (Physics.Raycast(transform.position, transform.forward, out hit)){
			if (hit.collider.gameObject.tag == "AI" && myself.nodding){
				print ("Trigger something here");
				alert.transform.localScale = new Vector3(1,1,1) * 10;
			}
			else {
				alert.transform.localScale = new Vector3(1,1,1) * 1;
			}
		}
	
	}
}
